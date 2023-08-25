import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { AuthType, User } from '@models/index';
import { SmsService } from '@services/sms.service';
import { comparisonValidator } from '@utils/validators';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/operators';


export enum PasswordResetSteps {
  GET_CODE,
  SET_NEW_PASSWORD,
}


@Component({
  selector: 'sw-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResetPasswordComponent {

  @Output() changeAuthTab: EventEmitter<any> = new EventEmitter<any>();

  @Output() closeSidePanel: EventEmitter<any> = new EventEmitter<any>();

  @Output() passWordChangeSuccess: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private smsService: SmsService,
    private cdr: ChangeDetectorRef
  ) {
    this.passwordResetForm = new UntypedFormGroup({
      sms_validation: new UntypedFormControl('', { validators: [Validators.required, Validators.minLength(4), Validators.maxLength(4)] }),
      phone_number: new UntypedFormControl('', { validators: [Validators.required, Validators.minLength(9)] }),
      password: new UntypedFormControl({ value: '', disabled: true }, { validators: [Validators.required, Validators.minLength(6)] }),
      password_confirmation: new UntypedFormControl({ value: '', disabled: true }, { validators: [Validators.required, Validators.minLength(6)] }),
    });

    this.passwordResetForm.setValidators(comparisonValidator())
  }

  passwordResetForm: UntypedFormGroup;
  isLoadingResults = false;

  AUTHTYPE = AuthType;

  waitingForCode: boolean = false;

  counter: number = 30;
  user: User;
  code: number;

  passwordResetActiveStep: PasswordResetSteps = PasswordResetSteps.GET_CODE;

  PASSWORD_RRESET_STEPS = PasswordResetSteps;

  private unsubscribe$: Subject<null> = new Subject();


  getVerificationCode() {

    let phoneNumber: number = parseInt(this.passwordResetForm.controls["phone_number"].value);
    let phoneNumberValid: boolean = this.passwordResetForm.controls["phone_number"].valid;

    if (this.waitingForCode) {
      return;
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

  onSubmit(): void {
    if (this.passwordResetForm.valid) {

      let phoneNumber: number = parseInt(this.passwordResetForm.controls["phone_number"].value);
      let smsValidation: number = parseInt(this.passwordResetForm.controls["sms_validation"].value);

      if (this.passwordResetActiveStep === PasswordResetSteps.GET_CODE) {

        let phoneNumberValid: boolean = this.passwordResetForm.controls["phone_number"].valid;
        let smsValidationValid: boolean = this.passwordResetForm.controls["sms_validation"].valid;

        if (phoneNumberValid && smsValidationValid) {

          this.smsService.checkSMS(phoneNumber, smsValidation)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((res: any) => {

              if (res.code === 400) {

                this.passwordResetForm.controls['sms_validation'].setErrors({
                  invalidSMS: true
                });


              } else if (res.code === 200) {
                this.user = res.body;
                this.code = smsValidation;
                this.passwordResetActiveStep = PasswordResetSteps.SET_NEW_PASSWORD;

                this.passwordResetForm.controls["password"].enable();
                this.passwordResetForm.controls["password_confirmation"].enable();

                this.cdr.markForCheck();

              }


            });
        }
      }

      if (this.passwordResetActiveStep === PasswordResetSteps.SET_NEW_PASSWORD) {
        this.isLoadingResults = true;

        let password: string = this.passwordResetForm.controls["password"].value;
        let password_confirmation: string = this.passwordResetForm.controls["password_confirmation"].value;

        let passwordValid: boolean = this.passwordResetForm.controls["phone_number"].valid;
        let passwordConfirmationValid: boolean = this.passwordResetForm.controls["sms_validation"].valid;

        if (passwordValid && passwordConfirmationValid) {
          this.smsService.changeSMS(phoneNumber, smsValidation, password, password_confirmation).pipe(takeUntil(this.unsubscribe$))
            .subscribe((_res: any) => {
              this.isLoadingResults = false;
              this.onChangeAuthTab(AuthType.LOGIN);


              this.passWordChangeSuccess.emit();
            });
        }

      }

    }
  }

  onChangeAuthTab(authType: AuthType) {
    this.changeAuthTab.emit(authType);
  }

}
