import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxComponent } from './checkbox.component';
import { IconModule } from '../icon/icon.module';
import { IconRegistry } from '../icon/icon.registry';
import { swIconChecked, swIconUnchecked } from '@icons/ts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CheckboxComponent
  ],
  imports: [
    CommonModule,
    IconModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [CheckboxComponent]
})
export class CheckboxModule {

  constructor(private iconRegistry: IconRegistry) {
    this.iconRegistry.register([
      swIconChecked,
      swIconUnchecked
    ]);
  }


}
