import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddServiceComponent } from './add-service.component';
import { IconRegistry } from '@components/shared/icon/icon.registry';
import { swIconArrowLeft2, swIconArrowRight2, swIconArrowRightSmall, swIconBackIcon, swIconCloseIcon, swIconErrorIcon, swIconPlus } from '@icons/ts';
import { IconModule } from '@components/shared/icon/icon.module';
import { ButtonModule } from '@components/shared/button/button.module';
import { InputModule } from '@components/shared/input/input.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule } from '@ngx-translate/core';
import { NgxEditorModule } from 'ngx-editor';
import { RadioModule } from '@components/shared/radio/radio.module';
import { CheckboxModule } from '@components/shared/checkbox/checkbox.module';
import { ImageUploadModule } from '@components/shared/image-upload/image-upload.module';
import { ImageModule } from '@components/shared/image/image.module';
import { TagsService, AddServiceService } from '@services/index';

@NgModule({
  declarations: [
    AddServiceComponent
  ],
  imports: [
    CommonModule,
    IconModule,
    ButtonModule,
    InputModule,
    CheckboxModule,
    RadioModule,
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule,
    TranslateModule,
    NgxEditorModule,
    ImageUploadModule,
    ImageModule
  ],
  exports: [AddServiceComponent],
  providers: [TagsService, AddServiceService]
})
export class AddServiceModule {
  constructor(private iconRegistry: IconRegistry) {
    this.iconRegistry.register([
      swIconCloseIcon,
      swIconPlus,
      swIconBackIcon,
      swIconErrorIcon,
      swIconArrowRight2,
      swIconArrowLeft2,
      swIconArrowRightSmall
    ]);
  }
}
