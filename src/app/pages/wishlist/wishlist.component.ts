import { Location } from "@angular/common";
import { ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";
import { Device, LoadingStatus, Service } from "@models/index";
import { Store } from "@ngrx/store";
import { DeviceService } from "@services/device.service";
import { selectWishlistServices, selectWishlistServicesLoadingStatus } from "@store/service/service.selectors";
import { counter } from "@utils/utils";
import { Observable } from "rxjs/internal/Observable";
import { SWFadeInAnimation } from "@animations/index";

@Component({
    selector: 'sw-wishlist-page',
    templateUrl: './wishlist.component.html',
    styleUrls: ['./wishlist.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: [SWFadeInAnimation]
})
export class WishlistComponent {

    @HostBinding('class.sw-wishlist-page') className: boolean = true;

    constructor(
        private store: Store,
        private router: Router,
        private location: Location,
        private deviceService: DeviceService
    ) { }


    device: Device = this.deviceService.getDevice();
    DEVICE = Device;

    services$: Observable<Service[]> = this.store.select(selectWishlistServices);
    loadingStatus$: Observable<LoadingStatus> = this.store.select(selectWishlistServicesLoadingStatus);

    LOADING_STATUS = LoadingStatus;

    counter = counter;

    trackBy(index: number, _item: any) {
        return index;
    }

    goBack() {
        this.location.back();
    }

    goHome() {
        this.router.navigate(['/']);
    }

}