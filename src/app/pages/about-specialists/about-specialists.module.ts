import { NgModule } from "@angular/core";
import { AboutSpecialistsRouting } from './about-specialists.routing';
import { AboutSpecialistsComponent } from './about-specialists.component';
import { CommonModule } from "@angular/common";
import { TextPageModule } from "@components/text-page/text-page.module";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
    imports: [
        CommonModule,
        AboutSpecialistsRouting,
        TextPageModule,
        TranslateModule
    ],
    exports: [],
    declarations: [
        AboutSpecialistsComponent
    ]
})

export class AboutSpecialistsPageModule { }