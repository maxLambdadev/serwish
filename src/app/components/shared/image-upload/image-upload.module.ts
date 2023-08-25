import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageUploadComponent } from './image-upload.component';
import { IconModule } from '../icon/icon.module';
import { IconRegistry } from '../icon/icon.registry';
import { swIconCloseIcon, swIconPlus } from '@icons/ts';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [ImageUploadComponent],
  imports: [
    CommonModule,
    IconModule,
    TranslateModule
  ],
  exports: [ImageUploadComponent]
})
export class ImageUploadModule {
  constructor(private iconRegistry: IconRegistry) {
    this.iconRegistry.register([
      swIconCloseIcon,
      swIconPlus,
    ]);
  }
}
