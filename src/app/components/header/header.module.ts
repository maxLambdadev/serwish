import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "./header.component";
import { IconModule } from "@components/shared/icon/icon.module";
import { IconRegistry } from "@components/shared/icon/icon.registry";
import { RouterModule } from "@angular/router";
import { ImageModule } from "@components/shared/image/image.module";
import { DirectivesModule } from "@directives/directives.module";
import { ButtonModule } from "@components/shared/button/button.module";
import {
  swIconCheckIcon,
  swIconCloseIcon,
  swIconMenuIcon,
  swIconNextArrowIcon,
  swIconPlus,
  swIconUserIcon,
} from "@icons/ts";

import { SidePanelModule } from "@components/shared/sidepanel/sidepanel.module";
import { AuthModule } from "@components/auth/auth.module";
import { TranslateModule } from "@ngx-translate/core";
import { LangModule } from "@components/lang/lang.module";
import { UserService } from "@services/user.service";
import { CategoriesModule } from "@components/categories/categories.module";
import { AddServiceModule } from "@components/add-service/add-service.module";
import { ProfileModule } from "@components/profile/profile.module";
import { LoginPopupModule } from "@components/auth/login-popup/login-popup.module";
import { SpecialistInfoPopupModule } from "@components/auth/specialist-info-popup/specialist-info-popup.module";

import { HeaderSliderItemComponent } from "./components/header-slider-item/header-slider-item.component";
import { SwiperModule } from "swiper/angular";

@NgModule({
  declarations: [HeaderComponent, HeaderSliderItemComponent],
  imports: [
    CommonModule,
    IconModule,
    RouterModule,
    ImageModule,
    ButtonModule,
    DirectivesModule,
    SidePanelModule,
    AuthModule,
    TranslateModule,
    ProfileModule,
    LangModule,
    CategoriesModule,
    AddServiceModule,
    LoginPopupModule,
    SpecialistInfoPopupModule,
    SwiperModule,
  ],
  exports: [HeaderComponent],
  providers: [UserService],
})
export class HeaderModule {
  constructor(private iconRegistry: IconRegistry) {
    this.iconRegistry.register([
      swIconUserIcon,
      swIconMenuIcon,
      swIconNextArrowIcon,
      swIconPlus,
      swIconCloseIcon,
      swIconCheckIcon,
    ]);
  }
}
