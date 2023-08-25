import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { FloatingErrorInputCssStylerDirective, InputComponent, RightIconInputCssStylerDirective } from './input.component';

import { PipesModule } from '@pipes/index';

import { IconModule } from '@components/shared/icon/icon.module';
import { IconRegistry } from '@components/shared/icon/icon.registry';
import { ButtonModule } from '../button/button.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { swIconPasswordForgotIcon } from '@icons/ts';
import { IConfig, NgxMaskModule } from 'ngx-mask';

const maskConfig: Partial<IConfig> = {
    validation: false,
};

@NgModule({
    declarations: [InputComponent, RightIconInputCssStylerDirective, FloatingErrorInputCssStylerDirective],
    imports: [
        CommonModule,
        PipesModule,
        IconModule,
        ButtonModule,
        FormsModule,
        ReactiveFormsModule,
        NgxMaskModule.forRoot(maskConfig)
    ],
    exports: [InputComponent, RightIconInputCssStylerDirective, FloatingErrorInputCssStylerDirective]
})
export class InputModule {
    constructor(private iconRegistry: IconRegistry) {
        this.iconRegistry.register([
            swIconPasswordForgotIcon
        ]);
    }
}
