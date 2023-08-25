import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer.component';
import { IconModule } from '@components/shared/icon/icon.module';
import { IconRegistry } from '@components/shared/icon/icon.registry';
import { RouterModule } from '@angular/router';
import { ImageModule } from '@components/shared/image/image.module';
import { DirectivesModule } from '@directives/directives.module';
import { LangModule } from '@components/lang/lang.module';
import { TranslateModule } from '@ngx-translate/core';
import { swIconDropDownIcon } from '@icons/ts';

@NgModule({
  declarations: [FooterComponent],
  imports: [
    CommonModule,
    IconModule,
    RouterModule,
    ImageModule,
    DirectivesModule,
    LangModule,
    TranslateModule
  ],
  exports: [FooterComponent]
})
export class FooterModule {
  constructor(private iconRegistry: IconRegistry) {
    this.iconRegistry.register([
      swIconDropDownIcon
    ]);
  }
}
