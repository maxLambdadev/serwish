import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { IconModule } from "@components/shared/icon/icon.module";
import { ButtonModule } from "@components/shared/button/button.module";
import { RouterModule } from "@angular/router";
import { IconRegistry } from "@components/shared/icon/icon.registry";
import { swIconArrowLeft2, swIconArrowLeftSmall, swIconArrowRight2, swIconArrowRightSmall, swIconAttach, swIconBegin, swIconCall, swIconChat, swIconCheckIcon, swIconCornerRightDown, swIconEmpty, swIconEye, swIconEyeOff, swIconLikeIcon, swIconLocation, swIconLoveIcon, swIconMediumRectangle, swIconMoney, swIconNextArrowIcon, swIconRecomendation, swIconSend, swIconShareIcon, swIconStarIcon, swIconStop, swIconTwitterRectangle } from "@icons/ts";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { InputModule } from "@components/shared/input/input.module";
import { ImageModule } from "@components/shared/image/image.module";
import { PipesModule } from "@pipes/pipes.module";
import { RecomendationModule } from "../services/recomendation/recomendation.module";
import { HomeRouting } from "./home.routing";
import { HomeComponent } from "./home.component";
import { JoinUsModule } from "@components/join-us/join-us.module";
import { ServiceRequestModule } from "@components/service-request/service-request.module";
import { BannerModule } from "@components/shared/banner/banner.module";
import { FaqModule } from "@components/faq/faq.module";
import { BlogItemModule } from "@components/blog-item/blog-item.module";
import { SwiperModule } from "swiper/angular";
import { SpecialistItemModule } from "@components/specialist-item/specialist-item.module";
import { SearchCompactModule } from "@components/search-compact/search-compact.module";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { SliderService } from "@services/sliderService.service";
import { homeReducer, HomeEffects } from "@store/index";
import { FirstComponent } from './first/first.component';
import { TopSpecialistComponent } from "./top-specialist/top-specialist.component";
import { TopBlogComponent } from "./top-blog/top-blog.component";

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        IconModule,
        ButtonModule,
        RouterModule,
        HomeRouting,
        TranslateModule,
        FormsModule,
        ReactiveFormsModule,
        InputModule,
        ImageModule,
        PipesModule,
        RecomendationModule,
        JoinUsModule,
        ServiceRequestModule,
        BannerModule,
        FaqModule,
        BlogItemModule,
        SwiperModule,
        SpecialistItemModule,
        SearchCompactModule,
        StoreModule.forFeature('home', homeReducer),
        EffectsModule.forFeature([
            HomeEffects
        ]),
    ],
    exports: [],
    declarations: [
        HomeComponent,
        FirstComponent,
        TopSpecialistComponent,
        TopBlogComponent
    ],
    providers: [SliderService]
})

export class HomePageModule {
    constructor(private iconRegistry: IconRegistry) {
        this.iconRegistry.register([
            swIconTwitterRectangle,
            swIconMediumRectangle,
            swIconSend,
            swIconAttach,
            swIconBegin,
            swIconStop,
            swIconMoney,
            swIconArrowRight2,
            swIconArrowLeft2,
            swIconArrowRightSmall,
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
            swIconCall,
            swIconRecomendation,
            swIconChat,
            swIconCornerRightDown
        ]);
    }
}