import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from '@components/shared/button/button.module';
import { IconModule } from '@components/shared/icon/icon.module';
import { IconRegistry } from '@components/shared/icon/icon.registry';
import { ImageModule } from '@components/shared/image/image.module';
import { InputModule } from '@components/shared/input/input.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { swIconBackIcon, swIconCalendar, swIconCheckIcon, swIconCloseIcon, swIconFacebook, swIconNextArrowIcon, swIconPlus, swIconUserIcon } from '@icons/ts';
import { RadioModule } from '@components/shared/radio/radio.module';
import { TranslateModule } from '@ngx-translate/core';
import { SpecialistInfoPopupComponent } from './specialist-info-popup.component';


@NgModule({
    declarations: [
        SpecialistInfoPopupComponent
    ],
    imports: [
        CommonModule,
        TranslateModule,
        ButtonModule,
        IconModule,
        ImageModule,
        InputModule,
        RadioModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    exports: [SpecialistInfoPopupComponent]
})
export class SpecialistInfoPopupModule {
    constructor(private iconRegistry: IconRegistry) {
        this.iconRegistry.register([
            swIconPlus,
            swIconNextArrowIcon,
            swIconCalendar,
            swIconFacebook,
            swIconCheckIcon,
            swIconBackIcon,
            swIconCloseIcon,
            swIconUserIcon
        ]);
    }
}
