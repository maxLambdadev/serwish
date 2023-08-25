import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SearchCompactComponent } from './search-compact.component';
import { PipesModule } from '@pipes/pipes.module';
import { FormsModule } from '@angular/forms';
import { IconModule } from '@components/shared/icon/icon.module';
import { IconRegistry } from '@components/shared/icon/icon.registry';
import { ButtonModule } from '@components/shared/button/button.module';
import { swIconSearchIcon } from '@icons/ts';
import { TranslateModule } from '@ngx-translate/core';
import { ImageModule } from '@components/shared/image/image.module';



@NgModule({
    declarations: [SearchCompactComponent],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        PipesModule,
        ButtonModule,
        IconModule,
        TranslateModule,
        RouterModule,
        ImageModule
    ],
    exports: [SearchCompactComponent]
})
export class SearchCompactModule {
    constructor(private iconRegistry: IconRegistry) {
        this.iconRegistry.register([
            swIconSearchIcon
        ]);
    }
}
