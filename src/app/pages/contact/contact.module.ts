import { NgModule } from "@angular/core";
import { ContactRouting } from './contact.routing';
import { ContactComponent } from './contact.component';
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { IconModule } from "@components/shared/icon/icon.module";
import { ImageModule } from "@components/shared/image/image.module";
import { ButtonModule } from "@components/shared/button/button.module";
import { RouterModule } from "@angular/router";
import { InputModule } from "@components/shared/input/input.module";
import { TextAreaModule } from "@components/shared/textarea/textarea.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BreadcrumbModule } from "@components/breadcrumb/breadcrumb.module";
import { IconRegistry } from "@components/shared/icon/icon.registry";
import { swIconArrowRight2, swIconArrowRightSmall, swIconArrowLeft2, swIconDiscordRectangle, swIconFacebookRectangle, swIconInstagramRectangle, swIconLinkedInRectangle, swIconMediumRectangle, swIconRedditRectangle, swIconTelegramRectangle, swIconTwitterRectangle } from "@icons/ts";
import { ContactService } from "@services/contact.service";

@NgModule({
    imports: [
        CommonModule,
        ContactRouting,
        TranslateModule,
        IconModule,
        ImageModule,
        ButtonModule,
        RouterModule,
        InputModule,
        TextAreaModule,
        FormsModule,
        ReactiveFormsModule,
        BreadcrumbModule
    ],
    exports: [],
    declarations: [
        ContactComponent
    ],
    providers: [ContactService]
})

export class ContactPageModule {
    constructor(private iconRegistry: IconRegistry) {
        this.iconRegistry.register([
            swIconTwitterRectangle,
            swIconMediumRectangle,
            swIconLinkedInRectangle,
            swIconFacebookRectangle,
            swIconTelegramRectangle,
            swIconDiscordRectangle,
            swIconRedditRectangle,
            swIconInstagramRectangle,
            swIconArrowRight2,
            swIconArrowLeft2,
            swIconArrowRightSmall
        ]);
    }
}