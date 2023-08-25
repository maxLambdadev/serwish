import { NgModule } from "@angular/core";
import { SpecialistsRouting } from './specialists.routing';
import { SpecialistsComponent } from './specialists.component';
import { CommonModule } from "@angular/common";
import { SpecialistItemModule } from "@components/specialist-item/specialist-item.module";
import { BannerModule } from "@components/shared/banner/banner.module";
import { SpecialistDetailsComponent } from "./specialist-details/specialist-details.component";
import { IconModule } from "@components/shared/icon/icon.module";
import { TranslateModule } from "@ngx-translate/core";
import { swIconArrowLeftSmall, swIconArrowRightSmall, swIconCheckIcon, swIconEmpty, swIconEye, swIconEyeOff, swIconStarIcon } from "@icons/ts";
import { IconRegistry } from "@components/shared/icon/icon.registry";
import { ImageModule } from "@components/shared/image/image.module";
import { ServiceItemModule } from "@components/service-item/service-item.module";
import { SwiperModule } from "swiper/angular";
import { SearchModule } from "@components/search/search.module";
import { ReviewPhonePopupModule } from "@components/review-phone-popup/review-phone-popup.module";
import { PipesModule } from "@pipes/pipes.module";
import { ServiceItemMobileModule } from "@components/service-item-mobile/service-item-mobile.module";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { specialistReducer, SpecialistEffects } from "@store/index";
import { OverlayModule } from "@angular/cdk/overlay";
import { PortalModule } from "@angular/cdk/portal";
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { JsonLdModule } from "ngx-seo";

@NgModule({
    imports: [
        CommonModule,
        SpecialistsRouting,
        BannerModule,
        IconModule,
        SpecialistItemModule,
        ServiceItemModule,
        ServiceItemMobileModule,
        TranslateModule,
        SwiperModule,
        ImageModule,
        SearchModule,
        OverlayModule,
        PortalModule,
        ReviewPhonePopupModule,
        PipesModule,
        StoreModule.forFeature('specialist', specialistReducer),
        EffectsModule.forFeature([
            SpecialistEffects
        ]),
        InfiniteScrollModule,
        JsonLdModule
    ],
    exports: [],
    declarations: [
        SpecialistsComponent,
        SpecialistDetailsComponent
    ]
})

export class SpecialistsPageModule {
    constructor(private iconRegistry: IconRegistry) {
        this.iconRegistry.register([
            swIconCheckIcon,
            swIconStarIcon,
            swIconEye,
            swIconEyeOff,
            swIconEmpty,
            swIconArrowLeftSmall,
            swIconArrowRightSmall
        ]);
    }
}