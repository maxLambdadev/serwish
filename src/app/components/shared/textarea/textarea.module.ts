import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TextAreaComponent } from './textarea.component';

import { PipesModule } from '@pipes/index';

import { IconModule } from '@components/shared/icon/icon.module';
import { IconRegistry } from '@components/shared/icon/icon.registry';
import { ButtonModule } from '../button/button.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [TextAreaComponent],
    imports: [
        CommonModule,
        PipesModule,
        IconModule,
        ButtonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [TextAreaComponent]
})
export class TextAreaModule {
    constructor(private iconRegistry: IconRegistry) {
        this.iconRegistry.register([
            
        ]);
    }
}
