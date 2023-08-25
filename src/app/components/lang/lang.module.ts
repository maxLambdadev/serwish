import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LangComponent } from './lang.component';
import { TranslateModule } from '@ngx-translate/core';
import { IconRegistry } from '@components/shared/icon/icon.registry';
import { swIconDropDownIcon } from '@icons/ts';
import { IconModule } from '@components/shared/icon/icon.module';



@NgModule({
  declarations: [LangComponent],
  imports: [
    CommonModule,
    TranslateModule,
    IconModule
  ],
  exports: [LangComponent]
})
export class LangModule {
  constructor(private iconRegistry: IconRegistry) {
    this.iconRegistry.register([
      swIconDropDownIcon
    ]);
  }
}
