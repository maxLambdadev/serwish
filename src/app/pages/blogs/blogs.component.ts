import { ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation } from "@angular/core";
import { Blog, Device, LoadingStatus } from "@models/index";
import { Store } from "@ngrx/store";
import { DeviceService } from "@services/device.service";
import { selectBlogs, selectBlogsLoadingStatus } from "@store/blog/blog.selectors";
import { counter } from "@utils/utils";
import { Observable } from "rxjs/internal/Observable";

@Component({
    selector: 'ws-blog-page',
    templateUrl: './blogs.component.html',
    styleUrls: ['./blogs.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class BlogsComponent {

    @HostBinding('class.sw-specialists-page') className: boolean = true;

    constructor(
        private store: Store,
        private deviceService: DeviceService
    ) { }

    blogs$: Observable<Blog[]> = this.store.select(selectBlogs);
    loadingStatus$: Observable<LoadingStatus> = this.store.select(selectBlogsLoadingStatus);

    LOADING_STATUS = LoadingStatus;

    device: Device = this.deviceService.getDevice();
    DEVICE = Device;

    counter = counter;

    trackBy(index: number, _item: any) {
        return index;
    }

}