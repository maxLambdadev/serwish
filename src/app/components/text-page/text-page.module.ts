import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextPageComponent } from './text-page.component';
import { IconModule } from '@components/shared/icon/icon.module';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { IconRegistry } from '@components/shared/icon/icon.registry';
import { swIconArrowLeft2, swIconArrowRight2, swIconArrowRightSmall } from '@icons/ts';



@NgModule({
  declarations: [
    TextPageComponent
  ],
  imports: [
    CommonModule,
    IconModule,
    TranslateModule,
    RouterModule
  ],
  exports: [TextPageComponent]
})
export class TextPageModule {

  constructor(private iconRegistry: IconRegistry) {
    this.iconRegistry.register([
      swIconArrowRight2,
      swIconArrowLeft2,
      swIconArrowRightSmall
    ]);
  }

}
