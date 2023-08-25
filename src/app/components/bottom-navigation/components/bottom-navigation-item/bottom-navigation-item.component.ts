import {
    ChangeDetectionStrategy,
    Component,
    Input,
    ViewEncapsulation,
} from '@angular/core';
import { AppEvents, NavigationItem, Page } from '@models/index';
import { AppEventsService } from '@services/appEvents.service';


@Component({
    selector: 'ss-bottom-navigation-item',
    templateUrl: './bottom-navigation-item.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BottomNavigationItemComponent {

    constructor(
        private appEventsService: AppEventsService
    ) {
    }

    APP_EVENTS = AppEvents;

    @Input() navItem: NavigationItem;

    @Input() activePage: Page;

    itemClick(): void {

        if (this.navItem.translateKey === "CATEGORIES") {

            let headerWrapper = document.querySelector('.sw-header-wrapper');

            headerWrapper.classList.remove("sw-header-wrapper--up");

            this.appEventsService.setValue(AppEvents.SHOW_CATEGORIES, {
                showCategories: true
            });
        }


    }

}
