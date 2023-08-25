import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from "@angular/core";
import { UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";
import { AuthType, Device } from "@models/index";
import { AuthService } from "@services/auth.service";
import { SWShakeAnimation } from "@animations/index";
import { environment } from "../../../../environments/environment";

const apiUrl = environment.apiUrl;

@Component({
  selector: "sw-login-popup",
  templateUrl: "./login-popup.component.html",
  styleUrls: ["./login-popup.component.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [SWShakeAnimation],
})
export class LoginPopupComponent {
  @Output() changeAuthTab: EventEmitter<any> = new EventEmitter<any>();

  @Output() closeLoginPopup: EventEmitter<any> = new EventEmitter<any>();

  @Input() isOrder: boolean = false;

  @Input() device: Device;

  DEVICE = Device;

  loginForm: UntypedFormGroup;

  constructor(private authService: AuthService, private cdr: ChangeDetectorRef) {
    this.loginForm = new UntypedFormGroup({
      username: new UntypedFormControl("", {
        validators: [Validators.required, Validators.minLength(9)],
      }),
      password: new UntypedFormControl("", {
        validators: [Validators.required, Validators.minLength(6)],
      }),
    });
  }

  isLoadingResults = false;

  AUTHTYPE = AuthType;

  animationState = "inactive";

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoadingResults = true;

      this.authService.login(this.loginForm.value).subscribe(
        () => {
          this.isLoadingResults = false;
          this.closeLoginPopup.emit();
          this.cdr.markForCheck();
        },
        (_error: any) => {
          this.isLoadingResults = false;

          this.loginForm.controls["password"].setErrors({
            invalidPasswordOrUsername: true,
          });

          this.loginForm.markAllAsTouched();
          this.cdr.markForCheck();
          this.reAnimate();
        },
      );
    } else {
      this.reAnimate();
    }
  }

  // onSubmitFb(): void {
  //   window.open(`${apiUrl}/api/auth/facebook`, "_blank");
  // }

  onSubmitGoogle(): void {
    window.open(`${apiUrl}/api/auth/google`, "_blank");
  }

  onChangeAuthTab(authType: AuthType) {
    this.changeAuthTab.emit(authType);
    this.closePopup();
  }

  closePopup() {
    this.closeLoginPopup.emit();
  }

  reAnimate() {
    this.animationState = "active";
  }

  reAnimattingDone() {
    this.animationState = "inactive";
  }
}
