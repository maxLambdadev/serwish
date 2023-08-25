import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaqComponent } from './faq.component';
import { ButtonModule } from '@components/shared/button/button.module';
import { IconModule } from '@components/shared/icon/icon.module';
import { IconRegistry } from '@components/shared/icon/icon.registry';
import { ImageModule } from '@components/shared/image/image.module';
import { swIconNextArrowIcon } from '@icons/ts';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '@pipes/pipes.module';
import { FaqService } from '@services/faqService.service';

import { faqReducer, FaqEffects } from '@store/index';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [
    FaqComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    IconModule,
    ImageModule,
    TranslateModule,
    PipesModule,
    StoreModule.forFeature('faq', faqReducer),
    EffectsModule.forFeature([
      FaqEffects
    ]),
  ],
  exports: [FaqComponent],
  providers: [FaqService]
})
export class FaqModule {
  constructor(private iconRegistry: IconRegistry) {
    this.iconRegistry.register([
      swIconNextArrowIcon
    ]);
  }
}
