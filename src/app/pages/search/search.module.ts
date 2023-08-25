import { NgModule } from "@angular/core";
import { SearchPageRouting } from './search.routing';
import { SearchPageComponent } from './search.component';
import { ButtonModule } from "@components/shared/button/button.module";
import { CommonModule } from "@angular/common";
import { ImageModule } from "@components/shared/image/image.module";
import { SearchModule } from "@components/search/search.module";

@NgModule({
    imports: [CommonModule, SearchPageRouting, ButtonModule, ImageModule, SearchModule],
    exports: [],
    declarations: [SearchPageComponent]
})

export class SearchPageModule {
}