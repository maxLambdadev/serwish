import { NgModule } from "@angular/core";
import { NotFoundRouting } from './not-found.routing';
import { NotFoundComponent } from './not-found.component';
import { ButtonModule } from "@components/shared/button/button.module";
import { CommonModule } from "@angular/common";
import { ImageModule } from "@components/shared/image/image.module";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
    imports: [CommonModule, NotFoundRouting, ButtonModule, ImageModule, TranslateModule],
    exports: [],
    declarations: [NotFoundComponent]
})

export class NotFoundModule {


}