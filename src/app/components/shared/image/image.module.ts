import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageComponent } from './image.component';
import { DirectivesModule } from '@directives/directives.module';

const components = [ImageComponent];

@NgModule({
    declarations: [...components],
    exports: [...components],
    imports: [CommonModule, DirectivesModule]
})
export class ImageModule { }
