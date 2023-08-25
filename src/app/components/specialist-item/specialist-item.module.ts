import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpecialistItemComponent } from './specialist-item.component';
import { ButtonModule } from '@components/shared/button/button.module';
import { IconModule } from '@components/shared/icon/icon.module';
import { IconRegistry } from '@components/shared/icon/icon.registry';
import { ImageModule } from '@components/shared/image/image.module';
import { swIconLikeIcon, swIconNextArrowIcon, swIconNoImg } from '@icons/ts';
import { swIconStarIcon } from '@icons/ts';
import { SpecialistItemLoaderComponent } from './specialist-item-loader/specialist-item-loader.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '@pipes/pipes.module';


@NgModule({
  declarations: [
    SpecialistItemComponent,
    SpecialistItemLoaderComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    IconModule,
    ImageModule,
    RouterModule,
    TranslateModule,
    PipesModule
  ],
  exports: [
    SpecialistItemComponent,
    SpecialistItemLoaderComponent
  ]
})
export class SpecialistItemModule {
  constructor(private iconRegistry: IconRegistry) {
    this.iconRegistry.register([
      swIconLikeIcon,
      swIconStarIcon,
      swIconNoImg,
      swIconNextArrowIcon
    ]);
  }
}
