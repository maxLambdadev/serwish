import { NgModule } from "@angular/core";
import { PolicyRouting } from './policy.routing';
import { PolicyComponent } from './policy.component';
import { CommonModule } from "@angular/common";
import { TextPageModule } from "@components/text-page/text-page.module";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
    imports: [
        CommonModule,
        PolicyRouting,
        TextPageModule,
        TranslateModule
    ],
    exports: [],
    declarations: [
        PolicyComponent
    ]
})

export class PolicyPageModule {

}