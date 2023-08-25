import { ChangeDetectionStrategy, Component, HostBinding, Inject, OnDestroy, OnInit, PLATFORM_ID, ViewEncapsulation } from "@angular/core";
import { Ads, Device, LoadingStatus } from "@models/index";
import { Store } from "@ngrx/store";

import { takeUntil } from "rxjs/operators";
import { selectIsAuth } from "@store/user/user.selectors";
import { Observable } from "rxjs/internal/Observable";
import { Subject } from "rxjs/internal/Subject";
import { isPlatformBrowser } from "@angular/common";

import SwiperCore, { Pagination, Autoplay, EffectFade } from "swiper";
import { counter } from "@utils/utils";
import { AdsService, DeviceService } from "@services/index";

// install Swiper modules
SwiperCore.use([Pagination, Autoplay, EffectFade]);

@Component({
    selector: 'sw-home-page',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit, OnDestroy {

    @HostBinding('class.sw-home-page') className: boolean = true;

    constructor(
        @Inject(PLATFORM_ID) private platformId: any,
        private store: Store,
        private adsService: AdsService,
        private deviceService: DeviceService
    ) { }

    DEVICE = Device;
    LOADING_STATUS = LoadingStatus;

    isAuth$: Observable<boolean> = this.store.select(selectIsAuth);

    ads: Array<Ads>;
    device: Device = this.deviceService.getDevice();

    private unsubscribe$: Subject<null> = new Subject();

    counter = counter;

    ngOnInit(): void {

        if (isPlatformBrowser(this.platformId)) {

            this.adsService.getAds('home')
                .pipe(takeUntil(this.unsubscribe$))
                .subscribe((ads: Ads[]) => {
                    this.ads = ads;
                });

        }
    }

    trackBy(index: number, _item: any) {
        return index;
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next(null);
        this.unsubscribe$.complete();
    }

}