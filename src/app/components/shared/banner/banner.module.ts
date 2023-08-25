import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from './banner.component';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [
    BannerComponent
  ],
  imports: [
    CommonModule,
    TranslateModule
  ],
  exports: [BannerComponent]
})
export class BannerModule { }
