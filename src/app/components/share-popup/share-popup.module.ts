import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharePopupComponent } from './share-popup.component';
import { ShareModule } from 'ngx-sharebuttons';
import { TranslateModule } from '@ngx-translate/core';
import { IconModule } from '@components/shared/icon/icon.module';
import { ButtonModule } from '@components/shared/button/button.module';
import { FormsModule } from '@angular/forms';
import { IconRegistry } from '@components/shared/icon/icon.registry';
import { swIconDiscordRectangle, swIconFacebookRectangle, swIconInstagramRectangle, swIconLinkedInRectangle, swIconMediumRectangle, swIconRedditRectangle, swIconTelegramRectangle, swIconTwitterRectangle } from '@icons/ts';



@NgModule({
  declarations: [
    SharePopupComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    TranslateModule,
    IconModule,
    ButtonModule,
    FormsModule
  ],
  exports: [SharePopupComponent]
})
export class SharePopupModule {
  constructor(private iconRegistry: IconRegistry) {
    this.iconRegistry.register([
      swIconTwitterRectangle,
      swIconMediumRectangle,
      swIconLinkedInRectangle,
      swIconFacebookRectangle,
      swIconTelegramRectangle,
      swIconDiscordRectangle,
      swIconRedditRectangle,
      swIconInstagramRectangle
    ]);
  }
}
