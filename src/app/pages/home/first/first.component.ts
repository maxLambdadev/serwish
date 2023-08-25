import { ChangeDetectionStrategy, Component, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { Device, Slider } from '@models/index';
import { Store } from '@ngrx/store';
import { selectSlider } from '@store/home/home.selectors';
import { Observable } from 'rxjs';
import { SwiperOptions } from 'swiper';
import { SwiperComponent } from 'swiper/angular';

@Component({
  selector: 'sw-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FirstComponent {

  @ViewChild('swiper', { static: false }) swiper?: SwiperComponent;
  @ViewChild('swiperAdditional', { static: false }) swiperAdditional?: SwiperComponent;

  constructor(
    private store: Store
  ) { }

  @Input() device: Device;

  DEVICE = Device;

  slider$: Observable<Slider[]> = this.store.select(selectSlider);

  //Main outter slider
  configMain: SwiperOptions = {
    pagination: { el: '.sw-slider__pagination', clickable: true },
    effect: 'fade',
    autoplay: {
      delay: 6000,
      disableOnInteraction: false
    }
    // simulateTouch: false
  };

  //Main outter slider
  configMainAdditional: SwiperOptions = {
    pagination: false,
    // effect: 'fade',
    autoplay: {
      delay: 6000,
      disableOnInteraction: false
    }
  };


  onMainSlideChange(): void {
    this.swiperAdditional.swiperRef.slideTo(this.swiper.swiperRef.activeIndex);
  }


  goDown(): void {
    document.querySelector('#sw-main-anchor').scrollIntoView({ behavior: 'smooth' });
  }

  trackBy(index: number, _item: any) {
    return index;
  }


}
