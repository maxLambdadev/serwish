import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceItemMobileComponent } from './service-item-mobile.component';
import { ButtonModule } from '@components/shared/button/button.module';
import { IconModule } from '@components/shared/icon/icon.module';
import { IconRegistry } from '@components/shared/icon/icon.registry';
import { ImageModule } from '@components/shared/image/image.module';
import { ServiceItemMobileLoaderComponent } from './service-item-loader-mobile/service-item-loader-mobile.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { swIconCall, swIconCheckIcon, swIconEdit, swIconEye, swIconShareIcon } from '@icons/ts';
import { swIconLocation } from '@icons/ts/build/swIcon-location.icon';
import { FavoriteModule } from '@components/favorites/favorites.module';
import { PipesModule } from '@pipes/pipes.module';
import { PortalModule } from '@angular/cdk/portal';
import { OverlayModule } from '@angular/cdk/overlay';
import { SharePopupModule } from '@components/share-popup/share-popup.module';
import { ReviewPhonePopupModule } from '@components/review-phone-popup/review-phone-popup.module';

@NgModule({
  declarations: [
    ServiceItemMobileComponent,
    ServiceItemMobileLoaderComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    IconModule,
    ImageModule,
    RouterModule,
    TranslateModule,
    FavoriteModule,
    PipesModule,
    PortalModule,
    OverlayModule,
    SharePopupModule,
    ReviewPhonePopupModule
  ],
  exports: [
    ServiceItemMobileComponent,
    ServiceItemMobileLoaderComponent
  ]
})
export class ServiceItemMobileModule {
  constructor(private iconRegistry: IconRegistry) {
    this.iconRegistry.register([
      swIconShareIcon,
      swIconLocation,
      swIconCheckIcon,
      swIconEye,
      swIconCall,
      swIconEdit
    ]);
  }
}
