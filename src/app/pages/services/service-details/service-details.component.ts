import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { CdkPortal, Portal, TemplatePortal } from '@angular/cdk/portal';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, TemplateRef, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { Device, AppEvents, LoadingStatus, Service, Specialist } from '@models/index';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { selectService, selectIsAuth, selectServiceImage, selectServiceLoadingStatus, selectSimilarServices, selectSimilarServicesLoadingStatus, selectSimilarSpecialists, selectSimilarSpecialistsLoadingStatus, selectViewedServices, selectViewedServicesLoadingStatus } from '@store/index';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/operators';
import { SWFadeInAnimation } from '@animations/index';

// import Swiper core and required modules
import SwiperCore, { Autoplay, FreeMode, Navigation, SwiperOptions, Thumbs, Zoom } from "swiper";
import { JsonLdService } from 'ngx-seo';
import { SwiperComponent } from 'swiper/angular';
import { counter } from '@utils/utils';
import { SeoService, AppEventsService, DeviceService, ClickService } from '@services/index';

import { environment } from '../../../../environments/environment';
const apiUrl = environment.apiUrl;

// install Swiper modules
SwiperCore.use([FreeMode, Navigation, Thumbs, Autoplay, Zoom]);

@Component({
  selector: 'sw-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [SWFadeInAnimation]
})
export class ServiceDetailsComponent implements OnInit, OnDestroy {

  thumbsSwiper: any;

  constructor(
    private store: Store,
    private cdr: ChangeDetectorRef,
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef,
    private translateService: TranslateService,
    private deviceService: DeviceService,
    private appEventsService: AppEventsService,
    private jsonLdService: JsonLdService,
    private clickService: ClickService,
    private seoService: SeoService
  ) { }

  @ViewChild(CdkPortal) sharePortal: Portal<any>;

  @ViewChild('templatePortalContent') templatePortalContent: TemplateRef<unknown>;

  @ViewChild('reviewTemplatePortalContent') reviewTemplatePortalContent: TemplateRef<unknown>;

  @ViewChild("swiperRefGallery", { static: false }) swiperRefGallery?: SwiperComponent;

  @ViewChild("swiperRefGalleryThumbs", { static: false }) swiperRefGalleryThumbs?: SwiperComponent;

  device: Device = this.deviceService.getDevice();
  DEVICE = Device;
  apiUrl = apiUrl;
  link: string;
  sharePopupOverlayRef: OverlayRef;
  reviewPhonePopupOverlayRef: OverlayRef;

  //Login Popup
  loginPopupOverlayRef: OverlayRef;

  //Review Popup
  reviewPopupOverlayRef: OverlayRef;

  service$: Observable<any> = this.store.select(selectService);
  serviceLoadingStatus$: Observable<any> = this.store.select(selectServiceLoadingStatus);

  serviceId: number;

  specialists$: Observable<Specialist[]> = this.store.select(selectSimilarSpecialists);
  specialistsLoadingStatus$: Observable<LoadingStatus> = this.store.select(selectSimilarSpecialistsLoadingStatus);

  viewedServices$: Observable<Service[]>;
  viewedServicesLoadingStatus$: Observable<LoadingStatus> = this.store.select(selectViewedServicesLoadingStatus);

  similarServices$: Observable<Service[]>;
  similarServicesLoadingStatus$: Observable<LoadingStatus> = this.store.select(selectSimilarServicesLoadingStatus);

  LOADING_STATUS = LoadingStatus;

  showPhone: boolean = false;
  isCalled: boolean = false;

  hiddenPhoneNumber: string = '000000**'
  phoneNumber: string = '00000000'
  serviceName: string = 'name'
  replacement: string = '**';

  images$: Observable<any> = this.store.select(selectServiceImage);
  images: any;

  templatePortal: TemplatePortal<any>;
  selectedPortal: Portal<any>;

  openReviewPhonePopupLoading: boolean = false;

  isAuth$: Observable<boolean> = this.store.select(selectIsAuth);

  private unsubscribe$: Subject<null> = new Subject();

  configTopSpecialists: SwiperOptions = {
    slidesPerView: 'auto',
    spaceBetween: 16,
    grabCursor: true
  };

  configViewedServices: SwiperOptions = {
    slidesPerView: 'auto',
    spaceBetween: 16,
    grabCursor: true,
    loop: false,
  };

  serviceSlug: string;
  isAuth: boolean = false;

  _service: Service;

  configGalleryThumb: SwiperOptions = {
    width: 138,
    height: 138,
    direction: "vertical",
    spaceBetween: 10,
    slidesPerView: 2,
    watchSlidesProgress: true,
    cssMode: false
  };

  configGallery: SwiperOptions = {
    spaceBetween: 10,
    navigation: true,
    zoom: true,
    cssMode: false
  };

  counter = counter;

  ngOnInit(): void {

    this.service$
      .pipe(
        takeUntil(this.unsubscribe$))
      .subscribe((service: Service) => {

        this._service = service;

        this.phoneNumber = service?.contact_number;
        this.serviceName = service?.service_name;
        this.serviceId = service?.id;
        this.isCalled = service?.isCalled;
        this.serviceSlug = service?.translated?.slug;

        if (this.phoneNumber) {
          this.hiddenPhoneNumber = this.phoneNumber.substring(0, this.phoneNumber.length - 2) + this.replacement;
        }

        if (this.isCalled) {
          this.showPhone = true;
        }

        if (service.id) {
          this.link = `https://serwish.ge/services/${this.serviceId}/${this.serviceSlug}?locale=${this.translateService.currentLang}`;

          this.similarServices$ = this.store.select(selectSimilarServices(service.id));
          this.viewedServices$ = this.store.select(selectViewedServices(service.id));
          const jsonLdObject: any = {
            "@context": "http://schema.org/",
            "@type": "Product",
            "name": service.translated.title,
            "description": service.translated.description ? service.translated.description : "Description",
            "image": apiUrl + '/storage/' + service.images[0].path,
            "url": this.link,
            "brand": {
              "@type": "Brand",
              "name": service.specialist.name
            },
            "offers": {
              "@type": "Offer",
              "url": this.link,
              "priceCurrency": "GEL",
              "availability": "https://schema.org/InStock",
              "price": service.price,
              "priceValidUntil": "2077-01-01"
            }
          }

          if (service.reviews && service.reviews[0]) {
            jsonLdObject.review = {
              "@type": "Review",
              "reviewBody": service.reviews[0].description,
              "reviewRating": {
                "@type": "Rating",
                "ratingValue": service.reviews[0].likes ? 1 : 0,
                "worstRating": 0,
                "bestRating": 1
              },
              "author": {
                "@type": "Person",
                "name": service.reviews[0].user.name
              }
            }
          }

          if (service.totalReviews > 0) {
            jsonLdObject.aggregateRating = {
              "@type": "AggregateRating",
              "ratingValue": (parseInt(service.likePercent) * 5) / 100,
              "bestRating": "5",
              "worstRating": "0",
              "ratingCount": service.totalReviews,
            }
          }
          // console.log(jsonLdObject);
          this.jsonLdService.setData(jsonLdObject);
          this.seoService.createLinkForCanonicalURL();
        }
        this.cdr.markForCheck();
      });

    this.isAuth$.pipe(takeUntil(this.unsubscribe$))
      .subscribe((isAuth: boolean) => {
        this.isAuth = isAuth;
        this.cdr.markForCheck();
      });

    this.images$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((images: any) => {
        // Creat gallery items
        if (images && images.length > 0) {
          this.images = images.map((image: any) => { return { src: apiUrl + '/storage/' + image.name } });
          this.cdr.markForCheck();
        }
      });

  }

  //Review slider
  config: SwiperOptions = {
    slidesPerView: 'auto',
    spaceBetween: 16
  };

  togglePhoneNumber() {
    this.showPhone = true;

    this.clickService.click(this.serviceId);

    if (!this.isCalled && !this.openReviewPhonePopupLoading) {
      this.openReviewPhonePopupLoading = true;

      setTimeout(() => {
        this.openReviewPhonePopup();
      }, 5000);

    }

  }

  //WTF this check
  toggleFavorite(): void {
    this.cdr.detectChanges();
  }

  openSharePopup($event: any): void {

    $event.stopPropagation()
    $event.preventDefault();

    let config = new OverlayConfig({
      hasBackdrop: true,
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically()
    });


    this.sharePopupOverlayRef = this.overlay.create(config);
    this.sharePopupOverlayRef.attach(this.sharePortal);

    this.sharePopupOverlayRef.backdropClick().subscribe(() => this.sharePopupOverlayRef.detach());
  }

  closeSharePopup(): void {
    this.sharePopupOverlayRef.dispose();
  }

  openReviewPhonePopup(): void {

    this.selectedPortal = new TemplatePortal(
      this.templatePortalContent,
      this.viewContainerRef
    );

    let config: OverlayConfig = new OverlayConfig({
      hasBackdrop: true,
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically()
    });

    this.reviewPhonePopupOverlayRef = this.overlay.create(config);
    this.reviewPhonePopupOverlayRef.attach(this.selectedPortal);
  }

  closeReviewPhonePopup(): void {
    this.reviewPhonePopupOverlayRef.dispose();
  }

  APP_EVENTS = AppEvents;

  onChangeAuthTab(_$event: any) {
    this.appEventsService.setValue(AppEvents.SHOW_REGISTRATION, {
      showRegistration: true
    });
  }

  //Review
  openRecomendationPopup(): void {

    let reviewPopupPortal: Portal<any> = new TemplatePortal(
      this.reviewTemplatePortalContent,
      this.viewContainerRef
    );

    let config: OverlayConfig;

    if (this.device === Device.MOBILE) {
      config = new OverlayConfig({
        hasBackdrop: true,
        panelClass: 'sw-full',
        positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically()
      });
    } else {
      config = new OverlayConfig({
        hasBackdrop: true,
        positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically()
      });
    }

    this.reviewPopupOverlayRef = this.overlay.create(config);
    this.reviewPopupOverlayRef.attach(reviewPopupPortal);

    this.reviewPopupOverlayRef.backdropClick().subscribe(() => this.reviewPopupOverlayRef.detach());
  }

  closeRecomendationPopup(): void {
    this.reviewPopupOverlayRef.dispose();
  }

  onGalleryZoom($event: any): void {
    const galleryContainer = $event.target.closest('.sw-service-details__gallery');
    galleryContainer.classList.add("fullscreen");
  }

  onGalleryClose($event: any): void {
    const galleryContainer = $event.target.closest('.sw-service-details__gallery');
    galleryContainer.classList.remove("fullscreen");
  }

  trackBy(index: number, _item: any) {
    return index;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }

}
