import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BottomSheetComponent } from './bottom-sheet.component';
import { PortalModule } from '@angular/cdk/portal';
import { ButtonModule } from '../button/button.module';
import { IconModule } from '../icon/icon.module';
import { OverFlowService } from '@services/overflow.service';



@NgModule({
  declarations: [BottomSheetComponent],
  imports: [
    CommonModule,
    PortalModule,
    ButtonModule,
    IconModule
  ],
  providers: [OverFlowService],
  exports: [BottomSheetComponent]
})
export class BottomSheetModule { }
