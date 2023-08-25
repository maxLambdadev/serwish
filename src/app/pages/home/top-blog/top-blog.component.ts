import { ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Blog, Device, LoadingStatus } from '@models/index';
import { Store } from '@ngrx/store';
import { selectHomeBlogs, selectHomeBlogsLoadingStatus, fetchHomeBlogs } from '@store/index';
import { counter } from '@utils/utils';
import { Observable } from 'rxjs';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'sw-top-blog',
  templateUrl: './top-blog.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopBlogComponent implements OnInit {

  constructor(
    private store: Store
  ) { }

  @Input() device: Device;

  DEVICE = Device;
  LOADING_STATUS = LoadingStatus;

  configBlogs: SwiperOptions = {
    slidesPerView: 'auto',
    spaceBetween: 16,
    grabCursor: true
  };

  activeBlogFilter: string = "newest";

  blogs$: Observable<Blog[]> = this.store.select(selectHomeBlogs);
  blogsLoading$: Observable<LoadingStatus> = this.store.select(selectHomeBlogsLoadingStatus);

  counter = counter;

  ngOnInit(): void {
    this.store.dispatch(fetchHomeBlogs({ filterType: "newest" }));
  }

  changeBlogFilter($event: any, filterType: string) {

    this.activeBlogFilter = filterType;

    $event.stopPropagation()
    $event.preventDefault();

    this.store.dispatch(fetchHomeBlogs({ filterType: filterType }));
  }


  trackBy(index: number, _item: any) {
    return index;
  }


}
