import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from '@components/shared/button/button.module';
import { IconModule } from '@components/shared/icon/icon.module';
import { IconRegistry } from '@components/shared/icon/icon.registry';
import { swIconLogout, swIconNoImg } from '@icons/ts';
import { ImageModule } from '@components/shared/image/image.module';
import { RouterModule } from '@angular/router';
import { PipesModule } from '@pipes/pipes.module';

@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    ButtonModule,
    IconModule,
    ImageModule,
    RouterModule,
    PipesModule
  ],
  exports: [ProfileComponent]
})
export class ProfileModule {
  constructor(private iconRegistry: IconRegistry) {
    this.iconRegistry.register([
      swIconLogout,
      swIconNoImg
    ]);
  }
}
