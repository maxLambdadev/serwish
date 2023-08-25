import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogItemComponent } from './blog-item.component';
import { ButtonModule } from '@components/shared/button/button.module';
import { IconModule } from '@components/shared/icon/icon.module';
import { IconRegistry } from '@components/shared/icon/icon.registry';
import { ImageModule } from '@components/shared/image/image.module';
import { swIconLikeIcon, swIconNextArrowIcon, swIconNoImg } from '@icons/ts';
import { BlogItemLoaderComponent } from './blog-item-loader/blog-item-loader.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '@pipes/pipes.module';


@NgModule({
  declarations: [
    BlogItemComponent,
    BlogItemLoaderComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    IconModule,
    ImageModule,
    RouterModule,
    TranslateModule,
    PipesModule
  ],
  exports: [BlogItemComponent, BlogItemLoaderComponent]
})
export class BlogItemModule {
  constructor(private iconRegistry: IconRegistry) {
    this.iconRegistry.register([
      swIconLikeIcon,
      swIconNoImg,
      swIconNextArrowIcon
    ]);
  }
}
