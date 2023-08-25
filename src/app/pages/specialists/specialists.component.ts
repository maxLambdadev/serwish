import { ChangeDetectionStrategy, Component, HostBinding, OnDestroy, OnInit, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";
import { Ads, Device, LoadingStatus, PageData, Specialist } from "@models/index";
import { Store } from "@ngrx/store";
import { syncSelectedCategories, syncSelectedCities, fetchSpecialists, selectSpecialists, selectSpecialistsLoadingStatus, selectSpecialistsPageData } from "@store/index";
import { Location } from "@angular/common";
import { takeUntil } from "rxjs/operators";
import { DeviceService, AdsService } from "@services/index";
import { Observable } from "rxjs/internal/Observable";
import { Subject } from "rxjs/internal/Subject";
import { counter } from "@utils/utils";

@Component({
    selector: 'sw-specialists-page',
    templateUrl: './specialists.component.html',
    styleUrls: ['./specialists.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class SpecialistsComponent implements OnInit, OnDestroy {

    @HostBinding('class.sw-specialists-page') className: boolean = true;

    constructor(
        private store: Store,
        private router: Router,
        private location: Location,
        private adsService: AdsService,
        private deviceService: DeviceService,
    ) { }


    ads: Array<Ads>;

    ngOnInit(): void {

        this.adsService.getAds('specialists')
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((ads: Ads[]) => {
                this.ads = ads;
            });

        this.store.dispatch(syncSelectedCategories());
        this.store.dispatch(syncSelectedCities());

        this.specialistsPageData$
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((specialistsPageData: PageData) => {
                this.specialistsTotalPageCount = specialistsPageData.last_page;
            })
    }


    device: Device = this.deviceService.getDevice();
    DEVICE = Device;

    specialists$: Observable<Specialist[]> = this.store.select(selectSpecialists);
    loadingStatus$: Observable<LoadingStatus> = this.store.select(selectSpecialistsLoadingStatus);

    specialistsPageData$: Observable<PageData> = this.store.select(selectSpecialistsPageData);
    specialistsTotalPageCount: number;

    LOADING_STATUS = LoadingStatus;

    private unsubscribe$: Subject<null> = new Subject();

    counter = counter;

    goBack(): void {
        this.location.back();
    }

    goHome(): void {
        this.router.navigate(['/']);
    }

    activePage: number = 1;
    throttle = 300;
    scrollDistance = 1;
    scrollUpDistance = 2;

    onScrollDown(): void {
        this.activePage++;

        if (this.specialistsTotalPageCount >= this.activePage) {
            this.store.dispatch(fetchSpecialists({ pageId: this.activePage }));
        }

    }

    onUp(): void {

    }

    trackBy(index: number, _item: any) {
        return index;
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next(null);
        this.unsubscribe$.complete();
    }

}