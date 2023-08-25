import {
    Component,
    ChangeDetectionStrategy,
    Output,
    EventEmitter,
    ViewEncapsulation,
    Input,
} from '@angular/core';
import { NavigationItem, Page } from '@models/index';

import { SWTransform } from '@animations/index';

@Component({
    selector: 'ss-bottom-navigation',
    templateUrl: './bottom-navigation.component.html',
    styleUrls: [
        './bottom-navigation.component.scss',
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: [SWTransform('0.25s ease-in-out')],
})
export class BottomNavigationComponent {

    navigationItems: Array<NavigationItem> = [
        {
            "hasLink": true,
            "link": ["/"],
            "icon": 'nav-home',
            "translateKey": "HOME",
            "activeTab": "",
            "name": "Home",
        },
        {
            "hasLink": true,
            "link": ["/specialists"],
            "icon": 'nav-profile',
            "translateKey": "SPECIALISTS",
            "activeTab": "specialists",
            "name": "Specialists",
        },
        {
            "hasLink": true,
            "link": ["/search"],
            "icon": 'search-icon',
            "translateKey": "SEARCH",
            "activeTab": "search",
            "name": "Search",
            "isSearch": true
        },
        {
            "hasLink": true,
            "link": ["/blog"],
            "icon": 'nav-orders',
            "translateKey": "BLOG",
            "activeTab": "blog",
            "name": "Blog",
        },
        {
            "hasLink": false,
            "icon": 'nav-menu',
            "translateKey": "CATEGORIES",
            "activeTab": "categories",
            "name": "Categories",
        }
    ];

    @Input() activePage: Page;

    @Output() navigationClick: EventEmitter<any> = new EventEmitter<any>();

    activeNavName: string;
    activateAnimation = false;
    bgPosition: number = 40;

}
