import { isPlatformBrowser } from "@angular/common";
import { ApplicationRef, ChangeDetectionStrategy, Component, HostBinding, Inject, OnInit, PLATFORM_ID, ViewEncapsulation } from "@angular/core";
import { Device } from "@models/index";
import { DeviceService } from "@services/device.service";
import { scrollDistance } from "@utils/utils";
import { filter, first } from "rxjs/operators";

@Component({
    selector: 'sw-search-page',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class SearchPageComponent implements OnInit {

    @HostBinding('class.sw-search-page') className: boolean = true;


    constructor(
        @Inject(PLATFORM_ID) private platformId: any,
        private appRef: ApplicationRef,
        private deviceService: DeviceService
    ) { }


    device: Device = this.deviceService.getDevice();
    DEVICE = Device;

    scrollDistance = scrollDistance;

    ngOnInit(): void {

        if (isPlatformBrowser(this.platformId)) {

            this.appRef.isStable
                .pipe(
                    filter(val => val),
                    first()
                )
                .subscribe(() => {

                    this.scrollDistance((distance: number, scrollFromTop: number) => {

                        let searchFilters = document.querySelector('.sw-search-page__search');

                        if (searchFilters) {
                            if (distance > 0) {
                                searchFilters.classList.add('sw-search-page__search--up');
                                searchFilters.classList.remove('sw-search-page__search--down');
                            } else {

                                if (Math.abs(distance) > 200) {
                                    searchFilters.classList.add('sw-search-page__search--down');
                                    searchFilters.classList.remove('sw-search-page__search--up');
                                }
                            }

                            if (scrollFromTop < 100) {
                                searchFilters.classList.add('sw-search-page__search--down');
                                searchFilters.classList.remove('sw-search-page__search--up');
                            }
                        }

                    });

                });
        }


    }

}