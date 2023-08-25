import { NgModule } from "@angular/core";
import { TermsRouting } from './terms.routing';
import { TermsComponent } from './terms.component';
import { CommonModule } from "@angular/common";
import { TextPageModule } from "@components/text-page/text-page.module";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
    imports: [
        CommonModule,
        TermsRouting,
        TextPageModule,
        TranslateModule
    ],
    exports: [],
    declarations: [
        TermsComponent
    ]
})

export class TermsPageModule {

}