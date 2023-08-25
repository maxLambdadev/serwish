import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SearchComponent } from './search.component';
import { PipesModule } from '@pipes/pipes.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconModule } from '@components/shared/icon/icon.module';
import { IconRegistry } from '@components/shared/icon/icon.registry';
import { ButtonModule } from '@components/shared/button/button.module';
import { swIconChecked, swIconCloseIcon, swIconDropDown, swIconDropDownIcon, swIconRadio, swIconRadioActive, swIconSearchIcon, swIconUnchecked } from '@icons/ts';
import { TranslateModule } from '@ngx-translate/core';
import { CheckboxModule } from '@components/shared/checkbox/checkbox.module';
import { swIconFilter } from '@icons/ts/build/swIcon-filter.icon';
import { ImageModule } from '@components/shared/image/image.module';
import { SpecialistItemModule } from '@components/specialist-item/specialist-item.module';
import { ServiceItemModule } from '@components/service-item/service-item.module';
import { FiltersComponent } from './filters/filters.component';
import { FiltersItemComponent } from './filters/filters-item/filters-item.component';
import { PortalModule } from '@angular/cdk/portal';
import { OverlayModule } from '@angular/cdk/overlay';
import { ServiceItemMobileModule } from '@components/service-item-mobile/service-item-mobile.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FiltersEffects, filtersReducer } from '@store/index';

@NgModule({
    declarations: [SearchComponent, FiltersComponent, FiltersItemComponent, FiltersItemComponent],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        PipesModule,
        ButtonModule,
        IconModule,
        TranslateModule,
        CheckboxModule,
        RouterModule,
        PortalModule,
        OverlayModule,
        ImageModule,
        SpecialistItemModule,
        ServiceItemModule,
        ServiceItemMobileModule,
        StoreModule.forFeature('filters', filtersReducer),
        EffectsModule.forFeature([
            FiltersEffects
        ]),
    ],
    exports: [SearchComponent, FiltersComponent, FiltersItemComponent]
})
export class SearchModule {
    constructor(private iconRegistry: IconRegistry) {
        this.iconRegistry.register([
            swIconSearchIcon,
            swIconFilter,
            swIconChecked,
            swIconUnchecked,
            swIconCloseIcon,
            swIconRadio,
            swIconRadioActive,
            swIconDropDown,
            swIconDropDownIcon
        ]);
    }
}
