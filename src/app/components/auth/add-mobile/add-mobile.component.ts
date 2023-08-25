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
import { SmsService, UserService } from "@services/index";
import { takeUntil } from "rxjs/internal/operators/takeUntil";
import { Subject } from "rxjs/internal/Subject";
import { fetchUser } from "@store/index";
import { Store } from "@ngrx/store";

import { SWShakeAnimation } from "@animations/index";

@Component({
  selector: "sw-add-mobile",
  templateUrl: "./add-mobile.component.html",
  styleUrls: ["./add-mobile.component.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [SWShakeAnimation],
})
export class AddMobileComponent implements OnInit, OnDestroy {
  @Output() changeAuthTab: EventEmitter<any> = new EventEmitter<any>();
  @Output() closeSideBar: EventEmitter<any> = new EventEmitter<any>();
  @Output() changeAndClose: EventEmitter<any> = new EventEmitter<any>();

  @Input() device: Device;

  constructor(
    // private authService: AuthService,
    private userService: UserService,
    private smsService: SmsService,
    private cdr: ChangeDetectorRef,
    private store: Store,
  ) {
    this.registrationForm = new UntypedFormGroup({
      new_phone_number: new UntypedFormControl("", {
        validators: [Validators.required, Validators.minLength(9)],
      }),
      sms_validation: new UntypedFormControl("", {
        validators: [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(4),
        ],
      }),
      client_type: new UntypedFormControl(ClientType.CLIENT, {}),
    });
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

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.registrationForm.valid) {
      this.isLoadingResults = true;

      this.userService.updateUserPhone(this.registrationForm.value).subscribe(
        (res: any) => {
          this.isLoadingResults = false;

          if (res.message === "incorrect code") {
            this.registrationForm.controls["sms_validation"].setErrors({
              invalidSMS: true,
            });
            this.cdr.markForCheck();
            return;
          }

          if (res.body === "user this phone already exists") {
            this.registrationForm.controls["new_phone_number"].setErrors({
              phoneExists: true,
            });
            this.cdr.markForCheck();
            return;
          }
          this.changeAndClose.emit();

          this.store.dispatch(fetchUser());
          this.cdr.markForCheck();
          this.cdr.detectChanges();
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

  getVerificationCode() {
    let phoneNumber: number = parseInt(
      this.registrationForm.controls["new_phone_number"].value,
    );
    let phoneNumberValid: boolean = this.registrationForm.controls["new_phone_number"]
      .valid;

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
