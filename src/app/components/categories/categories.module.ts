import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories.component';
import { IconRegistry } from '@components/shared/icon/icon.registry';
import { swIconBackIcon } from '@icons/ts/build/swIcon-back_icon.icon';
import { IconModule } from '@components/shared/icon/icon.module';
import { swIconSettings } from '@icons/ts/build/swIcon-settings.icon';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { swIconDropLeft } from '@icons/ts';
import { ImageModule } from '@components/shared/image/image.module';



@NgModule({
  declarations: [
    CategoriesComponent
  ],
  imports: [
    CommonModule,
    IconModule,
    RouterModule,
    TranslateModule,
    ImageModule
  ],
  exports: [CategoriesComponent]
})
export class CategoriesModule {
  constructor(private iconRegistry: IconRegistry) {
    this.iconRegistry.register([
      swIconBackIcon,
      swIconSettings,
      swIconDropLeft
    ]);
  }
}
