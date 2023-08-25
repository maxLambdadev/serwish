import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BannerModule } from "@components/shared/banner/banner.module";
import { IconModule } from "@components/shared/icon/icon.module";
import { TranslateModule } from "@ngx-translate/core";
import { swIconArrowLeftSmall, swIconCall, swIconArrowRightSmall, swIconCheckIcon, swIconEmpty, swIconEye, swIconEyeOff, swIconLikeIcon, swIconLocation, swIconLoveIcon, swIconNextArrowIcon, swIconShareIcon, swIconStarIcon, swIconRecomendation, swIconChat } from "@icons/ts";
import { IconRegistry } from "@components/shared/icon/icon.registry";
import { ImageModule } from "@components/shared/image/image.module";
import { ButtonModule } from "@components/shared/button/button.module";
import { TextAreaModule } from "@components/shared/textarea/textarea.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RecomendationComponent } from "./recomendation.component";
import { PipesModule } from "@pipes/pipes.module";

@NgModule({
    imports: [
        CommonModule,
        BannerModule,
        IconModule,
        TranslateModule,
        ButtonModule,
        ImageModule,
        TextAreaModule,
        FormsModule,
        ReactiveFormsModule,
        PipesModule
    ],
    exports: [RecomendationComponent],
    declarations: [
        RecomendationComponent
    ]
})

export class RecomendationModule {
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
            swIconChat
        ]);
    }
}