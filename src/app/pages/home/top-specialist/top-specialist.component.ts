import { ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Device, Specialist } from '@models/index';
import { LoadingStatus } from '@models/loadingStatus';
import { Store } from '@ngrx/store';
import { selectHomeSpecialists, selectHomeSpecialistsLoadingStatus, fetchHomeSpecialists } from '@store/index';
import { counter } from '@utils/utils';
import { Observable } from 'rxjs';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'sw-top-specialist',
  templateUrl: './top-specialist.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopSpecialistComponent implements OnInit {

  constructor(
    private store: Store
  ) { }

  @Input() device: Device;

  DEVICE = Device;
  LOADING_STATUS = LoadingStatus;

  configTopSpecialists: SwiperOptions = {
    slidesPerView: 'auto',
    spaceBetween: 16,
    grabCursor: true,
    width: 320
  };

  activeSpecialistFilter: string = "ALL";

  specialists$: Observable<Specialist[]> = this.store.select(selectHomeSpecialists);
  specialistsLoadingStatus$: Observable<LoadingStatus> = this.store.select(selectHomeSpecialistsLoadingStatus);

  counter = counter;

  ngOnInit(): void {
    this.store.dispatch(fetchHomeSpecialists({ filterType: "ALL" }));
  }

  changeSpecialistFilter($event: any, filterType: string): void {

    this.activeSpecialistFilter = filterType;

    $event.stopPropagation()
    $event.preventDefault();

    this.store.dispatch(fetchHomeSpecialists({ filterType: filterType }));
  }

  trackBy(index: number, _item: any) {
    return index;
  }


}
