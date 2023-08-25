import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconModule } from '../icon/icon.module';
import { RadioComponent } from './radio.component';
import { IconRegistry } from '../icon/public_api';
import { swIconRadio, swIconRadioActive } from '@icons/ts';


@NgModule({
  declarations: [
    RadioComponent
  ],
  imports: [
    CommonModule,
    IconModule
  ],
  exports: [RadioComponent]
})
export class RadioModule {

  constructor(private iconRegistry: IconRegistry) {
    this.iconRegistry.register([
      swIconRadio,
      swIconRadioActive
    ]);
  }


}
