import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuthComponent } from "./auth.component";
import { ButtonModule } from "@components/shared/button/button.module";
import { IconModule } from "@components/shared/icon/icon.module";
import { IconRegistry } from "@components/shared/icon/icon.registry";
import { ImageModule } from "@components/shared/image/image.module";
import { InputModule } from "@components/shared/input/input.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RegistrationComponent } from "./registration/registration.component";
import { AddMobileComponent } from "./add-mobile/add-mobile.component";
import { LoginComponent } from "./login/login.component";
import {
  swIconBackIcon,
  swIconCalendar,
  swIconCheckIcon,
  swIconCloseIcon,
  swIconFacebook,
  swIconNextArrowIcon,
  swIconPlus,
  swIconUserIcon,
  swIconGoogle,
} from "@icons/ts";

import { RadioModule } from "@components/shared/radio/radio.module";
import { RegistrationSpecialistComponent } from "./registration-specialist/registration-specialist.component";
import { TranslateModule } from "@ngx-translate/core";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";
import { SpecialistInfoComponent } from "./specialist-info/specialist-info.component";
@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    RegistrationComponent,
    AddMobileComponent,
    RegistrationSpecialistComponent,
    ResetPasswordComponent,
    SpecialistInfoComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule,
    ButtonModule,
    IconModule,
    ImageModule,
    InputModule,
    RadioModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [AuthComponent],
})
export class AuthModule {
  constructor(private iconRegistry: IconRegistry) {
    this.iconRegistry.register([
      swIconPlus,
      swIconNextArrowIcon,
      swIconCalendar,
      swIconFacebook,
      swIconCheckIcon,
      swIconBackIcon,
      swIconCloseIcon,
      swIconGoogle,
      swIconUserIcon,
    ]);
  }
}
