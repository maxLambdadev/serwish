import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewEncapsulation,
} from "@angular/core";
import { UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";
import { AuthType, Device, ClientType } from "@models/index";
import { AuthService, SmsService } from "@services/index";
import { formatDate } from "@utils/utils";
import { comparisonValidator } from "@utils/validators";
import { takeUntil } from "rxjs/internal/operators/takeUntil";
import { Subject } from "rxjs/internal/Subject";

import { SWShakeAnimation } from "@animations/index";

@Component({
  selector: "sw-registration",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [SWShakeAnimation],
})
export class RegistrationComponent implements OnInit, OnDestroy {
  @Output() changeAuthTab: EventEmitter<any> = new EventEmitter<any>();

  @Input() device: Device;

  constructor(
    private authService: AuthService,
    private smsService: SmsService,
    private cdr: ChangeDetectorRef,
  ) {
    this.registrationForm = new UntypedFormGroup({
      name: new UntypedFormControl("", {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      gender: new UntypedFormControl("male", { validators: Validators.required }),
      date_of_birth: new UntypedFormControl("", { validators: Validators.required }),
      phone_number: new UntypedFormControl("", {
        validators: [Validators.required, Validators.minLength(9)],
      }),
      sms_validation: new UntypedFormControl("", {
        validators: [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(4),
        ],
      }),
      password: new UntypedFormControl("", {
        validators: [Validators.required, Validators.minLength(6)],
      }),
      password_confirmation: new UntypedFormControl("", {
        validators: [Validators.required, Validators.minLength(6)],
      }),
      client_type: new UntypedFormControl(ClientType.CLIENT, {}),
    });

    this.registrationForm.setValidators(comparisonValidator());
  }

  registrationForm: UntypedFormGroup;
  registrationType: ClientType = ClientType.CLIENT;

  AUTHTYPE = AuthType;
  DEVICE = Device;

  isLoadingResults: boolean;
  animationState = "inactive";

  submited: boolean;

  waitingForCode: boolean = false;
  counter: number = 30;

  private unsubscribe$: Subject<null> = new Subject();

  ngOnInit(): void {
    this.registrationForm.get("date_of_birth").patchValue(formatDate(new Date()));
  }

  onSubmit(): void {
    if (this.registrationForm.valid) {
      this.isLoadingResults = true;

      console.log(this.registrationForm.value);

      this.authService.register(this.registrationForm.value).subscribe(
        (res: any) => {
          this.isLoadingResults = false;

          if (res.message === "sms code invalid") {
            this.registrationForm.controls["sms_validation"].setErrors({
              invalidSMS: true,
            });
            this.cdr.markForCheck();
            return;
          }

          if (res.body === "user this phone already exists") {
            this.registrationForm.controls["phone_number"].setErrors({
              phoneExists: true,
            });
            this.cdr.markForCheck();
            return;
          }

          this.changeAuthTab.emit(AuthType.LOGIN);
          this.cdr.markForCheck();
        },
        (_error: any) => {
          // AQ SHEIDZLEBA
          this.isLoadingResults = false;
          this.registrationForm.markAllAsTouched();
          this.cdr.markForCheck();
        },
      );
    } else {
      this.reAnimate();
    }
  }

  goBack() {
    this.changeAuthTab.emit(AuthType.LOGIN);
  }

  getVerificationCode() {
    let phoneNumber: number = parseInt(
      this.registrationForm.controls["phone_number"].value,
    );
    let phoneNumberValid: boolean = this.registrationForm.controls["phone_number"].valid;

    if (this.waitingForCode) {
      return;
    }

    if (phoneNumberValid) {
      this.waitingForCode = true;
      this.smsService
        .sendSMS(phoneNumber)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(() => {
          let intervalId = setInterval(() => {
            this.counter = this.counter - 1;

            if (this.counter === 0) {
              this.counter = 30;
              clearInterval(intervalId);
              this.waitingForCode = false;
            }

            this.cdr.markForCheck();
          }, 1000);
        });
    }
  }

  onChangeAuthTab(authType: AuthType) {
    this.changeAuthTab.emit(authType);
  }

  reAnimate() {
    this.animationState = "active";
  }

  reAnimattingDone() {
    this.animationState = "inactive";
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }
}
