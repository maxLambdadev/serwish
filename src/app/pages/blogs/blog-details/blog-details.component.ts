import { ChangeDetectionStrategy, Component, ViewEncapsulation } from "@angular/core";
import { Blog, Device, LoadingStatus } from "@models/index";
import { Store } from "@ngrx/store";
import { DeviceService } from "@services/device.service";
import { selectBlog, selectBlogLoadingStatus } from "@store/blog/blog.selectors";
import { Observable } from "rxjs/internal/Observable";
import { SWFadeInAnimation } from "@animations/index";
import { environment } from '../../../../environments/environment';
const apiUrl = environment.apiUrl;

@Component({
    selector: 'ws-blog-details-page',
    templateUrl: './blog-details.component.html',
    styleUrls: ['./blog-details.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: [SWFadeInAnimation]
})
export class BlogDetailsComponent {

    constructor(
        private store: Store,
        private deviceService: DeviceService
    ) { }

    blog$: Observable<Blog> = this.store.select(selectBlog);
    loadingStatus$: Observable<LoadingStatus> = this.store.select(selectBlogLoadingStatus);

    LOADING_STATUS = LoadingStatus;

    device: Device = this.deviceService.getDevice();
    DEVICE = Device;
    apiUrl = apiUrl;

    trackBy(index: number, _item: any) {
        return index;
    }

}
