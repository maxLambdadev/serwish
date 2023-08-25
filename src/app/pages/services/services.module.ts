import { NgModule } from "@angular/core";
import { ServicesRouting } from './services.routing';
import { ServicesComponent } from './services.component';
import { CommonModule } from "@angular/common";
import { SpecialistItemModule } from "@components/specialist-item/specialist-item.module";
import { BannerModule } from "@components/shared/banner/banner.module";
import { IconModule } from "@components/shared/icon/icon.module";
import { TranslateModule } from "@ngx-translate/core";
import { swIconArrowLeftSmall, swIconCall, swIconArrowRightSmall, swIconCheckIcon, swIconEmpty, swIconEye, swIconEyeOff, swIconLikeIcon, swIconLocation, swIconLoveIcon, swIconNextArrowIcon, swIconShareIcon, swIconStarIcon, swIconRecomendation, swIconChat, swIconCloseIcon } from "@icons/ts";
import { IconRegistry } from "@components/shared/icon/icon.registry";
import { ImageModule } from "@components/shared/image/image.module";
import { ServiceItemModule } from "@components/service-item/service-item.module";
import { ServiceDetailsComponent } from './service-details/service-details.component';
import { ButtonModule } from "@components/shared/button/button.module";
import { SearchModule } from "@components/search/search.module";
import { FavoriteModule } from "@components/favorites/favorites.module";
import { SharePopupModule } from "@components/share-popup/share-popup.module";
import { PortalModule } from "@angular/cdk/portal";
import { OverlayModule } from "@angular/cdk/overlay";
import { SwiperModule } from "swiper/angular";
import { ReviewPhonePopupModule } from "@components/review-phone-popup/review-phone-popup.module";
import { LoginPopupModule } from "@components/auth/login-popup/login-popup.module";
import { TextAreaModule } from "@components/shared/textarea/textarea.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RecomendationModule } from "./recomendation/recomendation.module";
import { DirectivesModule } from "@directives/directives.module";
import { PipesModule } from "@pipes/pipes.module";
import { ServiceItemMobileModule } from "@components/service-item-mobile/service-item-mobile.module";
import { InfiniteScrollModule } from "ngx-infinite-scroll";

@NgModule({
    imports: [
        CommonModule,
        ServicesRouting,
        BannerModule,
        IconModule,
        ServiceItemModule,
        ServiceItemMobileModule,
        TranslateModule,
        ButtonModule,
        SwiperModule,
        ImageModule,
        SpecialistItemModule,
        SearchModule,
        FavoriteModule,
        PortalModule,
        OverlayModule,
        SharePopupModule,
        ReviewPhonePopupModule,
        LoginPopupModule,
        TextAreaModule,
        FormsModule,
        ReactiveFormsModule,
        RecomendationModule,
        DirectivesModule,
        PipesModule,
        InfiniteScrollModule,
    ],
    exports: [],
    declarations: [
        ServicesComponent,
        ServiceDetailsComponent,
    ]
})

export class ServicesPageModule {
    constructor(private iconRegistry: IconRegistry) {
        this.iconRegistry.register([
            swIconCheckIcon,
            swIconStarIcon,
            swIconEye,
            swIconEyeOff,
            swIconLoveIcon,
            swIconShareIcon,
            swIconLocation,
            swIconLikeIcon,
            swIconEmpty,
            swIconNextArrowIcon,
            swIconArrowLeftSmall,
            swIconArrowRightSmall,
            swIconCall,
            swIconRecomendation,
            swIconChat,
            swIconCloseIcon
        ]);
    }
}
