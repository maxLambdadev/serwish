import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidePanelComponent } from './sidepanel.component';
import { ButtonModule } from '../button/button.module';
import { IconModule } from '../icon/icon.module';
import { OverFlowService } from '@services/overflow.service';
import { swIconCloseIcon } from '@icons/ts';
import { IconRegistry } from '../icon/icon.registry';



@NgModule({
  declarations: [SidePanelComponent],
  imports: [
    CommonModule,
    ButtonModule,
    IconModule
  ],
  providers: [OverFlowService],
  exports: [SidePanelComponent]
})
export class SidePanelModule {

  constructor(private iconRegistry: IconRegistry) {
    this.iconRegistry.register([
      swIconCloseIcon
    ]);
  }

}
