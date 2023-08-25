import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Output,
  ViewEncapsulation,
} from "@angular/core";
import { UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthType } from "@models/index";
import { AuthService } from "@services/auth.service";
import { SWShakeAnimation } from "@animations/index";
import { environment } from "../../../../environments/environment";
const apiUrl = environment.apiUrl;

@Component({
  selector: "sw-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [SWShakeAnimation],
})
export class LoginComponent {
  @Output() changeAuthTab: EventEmitter<any> = new EventEmitter<any>();

  @Output() closeSidePanel: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {
    this.loginForm = new UntypedFormGroup({
      username: new UntypedFormControl("", {
        validators: [Validators.required, Validators.minLength(9)],
      }),
      password: new UntypedFormControl("", {
        validators: [Validators.required, Validators.minLength(6)],
      }),
    });
  }

  loginForm: UntypedFormGroup;
  isLoadingResults = false;

  AUTHTYPE = AuthType;

  animationState = "inactive";

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoadingResults = true;

      this.authService.login(this.loginForm.value).subscribe(
        () => {
          this.isLoadingResults = false;
          this.closeSidePanel.emit();
          this.router.navigate(["/"]);
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
  }

  reAnimate() {
    this.animationState = "active";
  }

  reAnimattingDone() {
    this.animationState = "inactive";
  }
}
