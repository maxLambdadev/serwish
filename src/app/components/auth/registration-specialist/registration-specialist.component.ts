import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { AuthType, UserType, ClientType } from '@models/index';
import { AuthService, SmsService } from '@services/index';
import { formatDate } from '@utils/utils';
import { comparisonValidator } from '@utils/validators';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/operators';

import { SWShakeAnimation } from '@animations/index';

@Component({
  selector: 'sw-registration-specialist',
  templateUrl: './registration-specialist.component.html',
  styleUrls: ['./registration-specialist.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [SWShakeAnimation]
})
export class RegistrationSpecialistComponent implements OnInit, OnDestroy {

  @Output() changeAuthTab: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
    private smsService: SmsService,
    private activatedRoute: ActivatedRoute,
    // private router: Router
  ) {
    this.registrationForm = new UntypedFormGroup({
      personal: new UntypedFormControl(UserType.PERSONAL, { validators: Validators.required }),
      gender: new UntypedFormControl('male', {}),
      id_number: new UntypedFormControl('', {}),
      name: new UntypedFormControl('', { validators: this.minLengthValidator }),
      date_of_birth: new UntypedFormControl('', { validators: Validators.required }),
      phone_number: new UntypedFormControl('', { validators: [Validators.required, Validators.minLength(9)] }),
      sms_validation: new UntypedFormControl('', { validators: [Validators.required, Validators.minLength(4), Validators.maxLength(4)] }),
      password: new UntypedFormControl('', { validators: [Validators.required, Validators.minLength(6)] }),
      password_confirmation: new UntypedFormControl('', { validators: [Validators.required, Validators.minLength(6)] }),
      client_type: new UntypedFormControl(ClientType.EMPLOYEE, {})
    });

    this.registrationForm.setValidators(comparisonValidator())
  }

  get activeType() { return this.registrationForm.controls["personal"].value }

  registrationForm: UntypedFormGroup;

  waitingForCode: boolean = false;
  counter: number = 30;

  private minLengthValidator = [
    Validators.minLength(3)
  ];

  private unsubscribe$: Subject<null> = new Subject();

  ngOnInit(): void {
    this.registrationForm.get('date_of_birth').patchValue(formatDate(new Date()));

    this.registrationForm.get('personal').valueChanges
      .subscribe((userType: UserType) => {
        if (userType === UserType.PERSONAL) {
          //Add
          this.registrationForm.get('gender').setValidators(Validators.required);
        } else if (userType === UserType.BUSINESS) {
          //Remove
          this.registrationForm.get('gender').clearValidators();
          this.registrationForm.get('gender').setValidators(null);
          this.registrationForm.get('gender').updateValueAndValidity();
        }
      });

    this.activatedRoute.queryParams
      .subscribe((params: Params) => {
        const name = params['name'];
        const type = params['type'];

        if (name) {
          this.registrationForm.get('name').setValue(name);
        }

        if (type) {
          this.registrationForm.get('personal').setValue(type);
        }

        this.cdr.markForCheck();

      });

  }

  isLoadingResults: boolean;
  animationState = 'inactive';

  goBack() {
    this.changeAuthTab.emit(AuthType.REGISTRATION);
  }

  onSubmit(): void {
    if (this.registrationForm.valid) {
      this.isLoadingResults = true;

      this.authService.register(this.registrationForm.value)
        .subscribe((res: any) => {

          this.isLoadingResults = false;

          if (res.message === "sms code invalid") {
            this.registrationForm.controls['sms_validation'].setErrors({
              invalidSMS: true
            });
            this.cdr.markForCheck();
            return;
          }

          if (res.body === "user this phone already exists") {
            this.registrationForm.controls['phone_number'].setErrors({
              phoneExists: true
            });
            this.cdr.markForCheck();
            return
          }

          this.changeAuthTab.emit(AuthType.LOGIN);
          this.cdr.markForCheck();
        }, (_error: any) => {
          // AQ SHEIDZLEBA
          this.isLoadingResults = false;
          this.registrationForm.markAllAsTouched();
          this.cdr.markForCheck();
        });
    } else {
      this.reAnimate();
    }
  }

  reAnimate() {
    this.animationState = 'active';
  }

  reAnimattingDone() {
    this.animationState = 'inactive';
  }

  getVerificationCode() {

    let phoneNumber: number = parseInt(this.registrationForm.controls["phone_number"].value);
    let phoneNumberValid: boolean = this.registrationForm.controls["phone_number"].valid;

    if (this.waitingForCode) {
      return
    }

    if (phoneNumberValid) {
      this.waitingForCode = true;
      this.smsService.sendSMS(phoneNumber).pipe(takeUntil(this.unsubscribe$))
        .subscribe(() => {

          let intervalId = setInterval(() => {
            this.counter = this.counter - 1;

            if (this.counter === 0) {
              this.counter = 30;
              clearInterval(intervalId)
              this.waitingForCode = false;
            }

            this.cdr.markForCheck();
          }, 1000)

        });
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }


}
