import { NgModule } from "@angular/core";
import { AboutQualityRouting } from './about-quality.routing';
import { AboutQualityComponent } from './about-quality.component';
import { CommonModule } from "@angular/common";
import { TextPageModule } from "@components/text-page/text-page.module";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
    imports: [
        CommonModule,
        AboutQualityRouting,
        TextPageModule,
        TranslateModule
    ],
    exports: [],
    declarations: [
        AboutQualityComponent
    ]
})

export class AboutQualityPageModule {

}