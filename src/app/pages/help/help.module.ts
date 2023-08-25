import { NgModule } from "@angular/core";
import { HelpRouting } from './help.routing';
import { HelpComponent } from './help.component';
import { CommonModule } from "@angular/common";
import { TextPageModule } from "@components/text-page/text-page.module";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
    imports: [
        CommonModule,
        HelpRouting,
        TextPageModule,
        TranslateModule
    ],
    exports: [],
    declarations: [
        HelpComponent
    ]
})

export class HelpPageModule {

}