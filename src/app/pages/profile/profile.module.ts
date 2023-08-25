import { NgModule } from "@angular/core";
import { ProfilePageRouting } from './profile.routing';
import { ProfilePageComponent } from './profile.component';
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { IconRegistry } from "@components/shared/icon/icon.registry";
import { IconModule } from "@components/shared/icon/icon.module";
import { ImageModule } from "@components/shared/image/image.module";
import { ImageUploadModule } from "@components/shared/image-upload/image-upload.module";
import { InputModule } from "@components/shared/input/input.module";
import { RadioModule } from "@components/shared/radio/radio.module";
import { CheckboxModule } from "@components/shared/checkbox/checkbox.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ButtonModule } from "@components/shared/button/button.module";
import { PipesModule } from "@pipes/pipes.module";
import { swIconNoImg, swIconEdit } from "@icons/ts";

@NgModule({
    imports: [
        CommonModule,
        ProfilePageRouting,
        TranslateModule,
        IconModule,
        ImageModule,
        ImageUploadModule,
        InputModule,
        RadioModule,
        CheckboxModule,
        FormsModule,
        ButtonModule,
        ReactiveFormsModule,
        PipesModule
    ],
    exports: [],
    declarations: [
        ProfilePageComponent
    ]
})

export class ProfilePageModule {

    constructor(private iconRegistry: IconRegistry) {
        this.iconRegistry.register([
            swIconEdit,
            swIconNoImg
        ]);
    }


}