import { Overlay, OverlayConfig, OverlayRef } from "@angular/cdk/overlay";
import { Portal, TemplatePortal } from "@angular/cdk/portal";
import { isPlatformBrowser } from "@angular/common";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, PLATFORM_ID, TemplateRef, ViewChild, ViewContainerRef, ViewEncapsulation } from "@angular/core";
import { Device, LoadingStatus, PageData, Review, Service, Specialist, SpecialistFilterArgs } from "@models/index";
import { Store } from "@ngrx/store";
import { TranslateService } from "@ngx-translate/core";
import { DeviceService, RecomendationService } from "@services/index";
import { clearSpecialistServices, fetchSpecialistServices, selectSpecialist, selectSpecialistLoadingStatus, selectSpecialistServices, selectSpecialistServicesLoadingStatus, selectSpecialistServicesPageData } from "@store/index";
import { counter } from "@utils/utils";
import { JsonLdService } from "ngx-seo";
import { Observable } from "rxjs/internal/Observable";
import { Subject } from "rxjs/internal/Subject";
import { takeUntil } from "rxjs/operators";
import { SWFadeInAnimation } from "@animations/index";
import { environment } from '../../../../environments/environment';
const apiUrl = environment.apiUrl;

import SwiperCore, { SwiperOptions, Autoplay } from "swiper";
import { JsonLd } from "ngx-seo/lib/json-ld";

// install Swiper modules
SwiperCore.use([Autoplay]);

@Component({
    selector: 'ws-specialist-details-page',
    templateUrl: './specialist-details.component.html',
    styleUrls: ['./specialist-details.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: [SWFadeInAnimation]
})
export class SpecialistDetailsComponent implements OnInit, OnDestroy {

    constructor(
        @Inject(PLATFORM_ID) private platformId: {},
        private store: Store,
        private cdr: ChangeDetectorRef,
        private overlay: Overlay,
        private viewContainerRef: ViewContainerRef,
        private deviceService: DeviceService,
        private recomendationService: RecomendationService,
        private jsonLdService: JsonLdService,
        private translateService: TranslateService
    ) {
    }
    @ViewChild('templatePortalContent') templatePortalContent: TemplateRef<unknown>;

    device: Device = this.deviceService.getDevice();
    DEVICE = Device;
    apiUrl = apiUrl;
    LOADING_STATUS = LoadingStatus;

    specialist$: Observable<Specialist> = this.store.select(selectSpecialist);
    loadingStatus$: Observable<LoadingStatus> = this.store.select(selectSpecialistLoadingStatus);
    specialistServices$: Observable<Service[]> = this.store.select(selectSpecialistServices);
    servicesLoadingStatus$: Observable<LoadingStatus> = this.store.select(selectSpecialistServicesLoadingStatus);
    specialistServicesPageData$: Observable<PageData> = this.store.select(selectSpecialistServicesPageData);

    showPhone: boolean = false;

    replacement: string = '**';
    hiddenPhoneNumber: string = '000000**'
    phoneNumber: string = '00000000'

    isCalled: boolean = false;

    //Recomendation slider
    configRecomendations: SwiperOptions = {
        slidesPerView: 'auto',
        spaceBetween: 16,
        grabCursor: true,
        loop: true,
    };

    templatePortal: TemplatePortal<any>;
    selectedPortal: Portal<any>;

    openReviewPhonePopupLoading: boolean = false;
    reviewPhonePopupOverlayRef: OverlayRef;

    _specialist: Specialist;
    specialistId: number;
    reviews: Array<Review> = [];
    specialistServicesPageCount: number;

    private unsubscribe$: Subject<null> = new Subject();

    counter = counter;

    ngOnInit(): void {

        this.specialist$
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((specialist: Specialist) => {
                this.phoneNumber = specialist?.phone_number;
                this.isCalled = specialist?.isCalled;
                this.specialistId = specialist?.id;
                this._specialist = specialist;

                if (this.specialistId) {

                    //Move this to effects
                    this.recomendationService.getSpecialistReviews(this.specialistId)
                        .pipe(takeUntil(this.unsubscribe$))
                        .subscribe((reviews: any) => {

                            //Create array from objects array , refactor this to recive array
                            Object.values(reviews).forEach((val: any) => {
                                if (val.description) {
                                    this.reviews.push(val);
                                }
                            });

                            this.cdr.markForCheck();
                        });
                }

                if (this.phoneNumber) {
                    this.hiddenPhoneNumber = this.phoneNumber.substring(0, this.phoneNumber.length - 2) + this.replacement;
                }

                if (this.isCalled) {
                    this.showPhone = true;
                }

                const jsonLdObject: JsonLd = {
                    "@context": "http://schema.org/",
                    "@type": "Product",
                    "name": specialist.name,
                    "image": "https://serwish.ge/serwish.png",
                    "description": specialist.categories ? specialist.categories : "Description",
                    "sku": specialist.id,
                    "url": `https://serwish.ge/services/${specialist.id}/${specialist.slug}?locale=${this.translateService.currentLang}`,
                    "brand": {
                        "@type": "Brand",
                        "name": specialist.name,
                    },
                    "offers": {
                        "@type": "Offer",
                        "url": `https://serwish.ge/services/${specialist.id}/${specialist.slug}?locale=${this.translateService.currentLang}`,
                        "priceCurrency": "GEL",
                        "availability": "https://schema.org/InStock",
                        "price": "50",
                        "priceValidUntil": "2077-01-01"
                    }
                };


                //If has review at least one
                if (specialist.reviews && specialist.reviews[0]) {
                    jsonLdObject.review = {
                        "@type": "Review",
                        "reviewBody": specialist.reviews[0].description,
                        "reviewRating": {
                            "@type": "Rating",
                            "ratingValue": specialist.reviews[0].likes ? 1 : 0,
                            "worstRating": 0,
                            "bestRating": 1
                        },
                        "author": {
                            "@type": "Person",
                            "name": specialist.reviews[0].user.name
                        }
                    }
                }

                if (specialist.totalReviews > 0) {
                    jsonLdObject.aggregateRating = {
                        "@type": "AggregateRating",
                        "ratingValue": (parseInt(specialist.likePercent) * 5) / 100,
                        "bestRating": "5",
                        "worstRating": "0",
                        "ratingCount": specialist.totalReviews,
                    }
                }

                this.jsonLdService.setData(jsonLdObject);

                this.cdr.markForCheck();
            });

        this.specialistServicesPageData$
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((pageData: PageData) => {
                if (pageData) {
                    this.specialistServicesPageCount = pageData.last_page;
                }
            });

    }

    togglePhoneNumber(): void {
        this.showPhone = true;
        if (!this.isCalled && !this.openReviewPhonePopupLoading) {
            this.openReviewPhonePopupLoading = true;

            setTimeout(() => {
                this.openReviewPhonePopup();
            }, 5000);
        }
    }

    openReviewPhonePopup() {
        this.selectedPortal = new TemplatePortal(
            this.templatePortalContent,
            this.viewContainerRef
        );

        const config: OverlayConfig = new OverlayConfig({
            hasBackdrop: true,
            positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically()
        });

        this.reviewPhonePopupOverlayRef = this.overlay.create(config);
        this.reviewPhonePopupOverlayRef.attach(this.selectedPortal);
    }

    closeReviewPhonePopup(): void {
        this.reviewPhonePopupOverlayRef.dispose();
    }

    activePage: number = 1;
    throttle = 300;
    scrollDistance = 1;
    scrollUpDistance = 2;

    onScrollDown(): void {
        if (isPlatformBrowser(this.platformId)) {
            this.activePage++;

            if (this.specialistServicesPageCount >= this.activePage) {
                const args: SpecialistFilterArgs = {
                    locale: localStorage.getItem('lang') || "ka",
                    page: this.activePage,
                    perPage: 4,
                };

                this.store.dispatch(fetchSpecialistServices({ id: this.specialistId, args: args }));
            }
        }
    }

    onUp(): void {

    }

    trackBy(index: number, _item: any) {
        return index;
    }

    ngOnDestroy(): void {
        this.store.dispatch(clearSpecialistServices());
        this.unsubscribe$.next(null);
        this.unsubscribe$.complete();
    }

}
