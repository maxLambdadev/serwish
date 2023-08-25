import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewPhonePopupComponent } from './review-phone-popup.component';
import { ShareModule } from 'ngx-sharebuttons';
import { TranslateModule } from '@ngx-translate/core';
import { IconModule } from '@components/shared/icon/icon.module';
import { ButtonModule } from '@components/shared/button/button.module';
import { FormsModule } from '@angular/forms';
import { IconRegistry } from '@components/shared/icon/icon.registry';
import { swIconCloseIcon, swIconSmileNeutral, swIconSmileMouthOpen, swIconSmile, swIconSmileSad } from '@icons/ts';
import { ImageModule } from '@components/shared/image/image.module';
import { PhoneReviewService } from '@services/phoneReview.service';
import { PipesModule } from '@pipes/pipes.module';


@NgModule({
  declarations: [
    ReviewPhonePopupComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    TranslateModule,
    IconModule,
    ButtonModule,
    FormsModule,
    ImageModule,
    PipesModule
  ],
  exports: [ReviewPhonePopupComponent],
  providers: [PhoneReviewService]
})
export class ReviewPhonePopupModule {
  constructor(private iconRegistry: IconRegistry) {
    this.iconRegistry.register([
      swIconSmile,
      swIconSmileSad,
      swIconSmileMouthOpen,
      swIconSmileNeutral,
      swIconCloseIcon
    ]);
  }
}
