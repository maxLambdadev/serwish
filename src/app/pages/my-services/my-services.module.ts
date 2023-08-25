import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TextPageModule } from "@components/text-page/text-page.module";
import { TranslateModule } from "@ngx-translate/core";
import { MyServicesComponent } from "./my-services.component";
import { MyServicesRouting } from "./my-services.routing";
import { ServiceItemModule } from "@components/service-item/service-item.module";
import { ServiceItemMobileModule } from "@components/service-item-mobile/service-item-mobile.module";
import { IconModule } from "@components/shared/icon/icon.module";
import { ButtonModule } from "@components/shared/button/button.module";
import { InputModule } from "@components/shared/input/input.module";
import { ReactiveFormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";

@NgModule({
    imports: [
        CommonModule,
        MyServicesRouting,
        TextPageModule,
        TranslateModule,
        ServiceItemModule,
        ServiceItemMobileModule,
        IconModule,
        ButtonModule,
        InputModule,
        ReactiveFormsModule,
        NgSelectModule
    ],
    exports: [],
    declarations: [
        MyServicesComponent
    ]
})

export class MyServicesPageModule {

}