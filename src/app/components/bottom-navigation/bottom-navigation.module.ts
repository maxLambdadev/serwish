import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BottomNavigationComponent } from './bottom-navigation.component';

import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

import { PipesModule } from '@pipes/index';

import { BottomNavigationItemComponent } from './components/bottom-navigation-item/bottom-navigation-item.component';
import { IconRegistry } from '@components/shared/icon/icon.registry';
import { IconModule } from '@components/shared/icon/icon.module';
import { swIconNavHome, swIconNavMenu, swIconNavOrders, swIconNavProfile, swIconNavSearch, swIconSearchIcon } from '@icons/ts';
@NgModule({
    declarations: [BottomNavigationComponent, BottomNavigationItemComponent],
    imports: [
        CommonModule,
        TranslateModule,
        RouterModule,
        PipesModule,
        IconModule,
    ],
    exports: [BottomNavigationComponent]
})
export class BottomNavigationModule {
    constructor(private iconRegistry: IconRegistry) {
        this.iconRegistry.register([
            swIconNavHome,
            swIconNavMenu,
            swIconNavOrders,
            swIconNavProfile,
            swIconNavSearch,
            swIconSearchIcon
        ]);
    }
}
