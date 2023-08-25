import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JoinUsComponent } from './join-us.component';
import { ButtonModule } from '@components/shared/button/button.module';
import { IconModule } from '@components/shared/icon/icon.module';
import { IconRegistry } from '@components/shared/icon/icon.registry';
import { ImageModule } from '@components/shared/image/image.module';
import { swIconNextArrowIcon } from '@icons/ts';
import { InputModule } from '@components/shared/input/input.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RadioModule } from '@components/shared/radio/radio.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    JoinUsComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    IconModule,
    ImageModule,
    InputModule,
    RadioModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  exports: [JoinUsComponent]
})
export class JoinUsModule {
  constructor(private iconRegistry: IconRegistry) {
    this.iconRegistry.register([
      swIconNextArrowIcon
    ]);
  }
}
