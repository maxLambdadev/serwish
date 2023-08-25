import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { FavoriteComponent } from './favorites.component';
import { IconModule } from '../shared/icon/icon.module';
import { DirectivesModule } from "@directives/directives.module";
import { ButtonModule } from "@components/shared/button/button.module";
import { TranslateModule } from "@ngx-translate/core";
import { IconRegistry } from "@components/shared/icon/icon.registry";
import { swIconLoveIcon } from "@icons/ts/build/swIcon-love_icon.icon";
import { PortalModule } from "@angular/cdk/portal";



@NgModule({
    imports: [
        CommonModule,
        IconModule,
        ButtonModule,
        DirectivesModule,
        TranslateModule,
        PortalModule,

    ],
    declarations: [FavoriteComponent],
    exports: [FavoriteComponent]
})
export class FavoriteModule {
    constructor(private iconRegistry: IconRegistry) {
        this.iconRegistry.register([
            swIconLoveIcon
        ]);
    }
}      