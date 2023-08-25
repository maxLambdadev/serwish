import { NgModule } from "@angular/core";
import { WishlistComponent } from './wishlist.component';
import { WishlistRouting } from './wishlist.routing';
import { CommonModule } from "@angular/common";
import { SpecialistItemModule } from "@components/specialist-item/specialist-item.module";
import { IconModule } from "@components/shared/icon/icon.module";
import { TranslateModule } from "@ngx-translate/core";
import { swIconArrowLeftSmall, swIconArrowRightSmall, swIconCheckIcon, swIconEmpty, swIconEye, swIconEyeOff, swIconLikeIcon, swIconLocation, swIconLoveIcon, swIconNextArrowIcon, swIconShareIcon, swIconStarIcon } from "@icons/ts";
import { IconRegistry } from "@components/shared/icon/icon.registry";
import { ImageModule } from "@components/shared/image/image.module";
import { ServiceItemModule } from "@components/service-item/service-item.module";
import { ButtonModule } from "@components/shared/button/button.module";
import { SearchModule } from "@components/search/search.module";
import { FavoriteModule } from "@components/favorites/favorites.module";
import { SharePopupModule } from "@components/share-popup/share-popup.module";
import { ServiceItemMobileModule } from "@components/service-item-mobile/service-item-mobile.module";

@NgModule({
    imports: [
        CommonModule,
        WishlistRouting,
        IconModule,
        ServiceItemModule,
        TranslateModule,
        ButtonModule,
        ImageModule,
        SpecialistItemModule,
        SearchModule,
        FavoriteModule,
        SharePopupModule,
        ServiceItemMobileModule
    ],
    exports: [],
    declarations: [
        WishlistComponent
    ]
})

export class WishlistPageModule {
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
            swIconNextArrowIcon, ,
            swIconArrowLeftSmall,
            swIconArrowRightSmall
        ]);
    }
}