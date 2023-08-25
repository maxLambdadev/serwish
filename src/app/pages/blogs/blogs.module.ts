import { NgModule } from "@angular/core";
import { BlogsRouting } from './blogs.routing';
import { BlogsComponent } from './blogs.component';
import { CommonModule } from "@angular/common";
import { ButtonModule } from "@components/shared/button/button.module";
import { BlogItemModule } from "@components/blog-item/blog-item.module";
import { BlogDetailsComponent } from "./blog-details/blog-details.component";
import { TranslateModule } from "@ngx-translate/core";
import { IconModule } from "@components/shared/icon/icon.module";
import { ImageModule } from "@components/shared/image/image.module";
import { PipesModule } from "@pipes/pipes.module";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { blogReducer, BlogEffects } from "@store/index";
import { swIconEmpty } from "@icons/ts";
import { IconRegistry } from "@components/shared/icon/icon.registry";

@NgModule({
    imports: [
        CommonModule,
        BlogsRouting,
        ButtonModule,
        BlogItemModule,
        TranslateModule,
        IconModule,
        ImageModule,
        PipesModule,
        StoreModule.forFeature('blog', blogReducer),
        EffectsModule.forFeature([
            BlogEffects
        ]),
    ],
    exports: [],
    declarations: [
        BlogsComponent,
        BlogDetailsComponent
    ]
})

export class BlogsPageModule {
    constructor(private iconRegistry: IconRegistry) {
        this.iconRegistry.register([
            swIconEmpty,
        ]);
    }
}