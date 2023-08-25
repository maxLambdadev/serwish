
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IconComponent } from './icon.component';
import { IconRegistry } from './icon.registry';
import { ImageModule } from '../image/image.module';
import { DirectivesModule } from '@directives/directives.module';

const components = [IconComponent];

@NgModule({
    imports: [CommonModule, ImageModule, DirectivesModule],
    providers: [IconRegistry],
    declarations: [...components],
    exports: [...components]
})
export class IconModule { }
