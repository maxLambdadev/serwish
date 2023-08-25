
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { CdkPortal, Portal, TemplatePortal } from '@angular/cdk/portal';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostBinding, Input, Output, TemplateRef, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { Device, Service, Specialist } from '@models/index';
import { TranslateService } from '@ngx-translate/core';
import { ClickService } from '@services/clickService.service';
import { environment } from '../../../environments/environment';
const apiUrl = environment.apiUrl;

@Component({
  selector: 'sw-service-item-mobile',
  templateUrl: './service-item-mobile.component.html',
  styleUrls: ['./service-item-mobile.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServiceItemMobileComponent {

  @ViewChild(CdkPortal) templatePortal: Portal<any>;

  @ViewChild('templatePortalContent') templatePortalContent: TemplateRef<unknown>;

  @HostBinding('class.sw-service-item-mobile') className: boolean = true;

  @Output() boostServiceClick: EventEmitter<number> = new EventEmitter<number>();

  constructor(
    private overlay: Overlay,
    private elementRef: ElementRef,
    private translateService: TranslateService,
    private cdr: ChangeDetectorRef,
    private viewContainerRef: ViewContainerRef,
    private clickService: ClickService
  ) {

  }

  hiddenPhoneNumber: string = '000000**'
  phoneNumber: string = '00000000'
  replacement = '**';

  //Phone review
  templatePortalPhoneReview: TemplatePortal<any>;
  selectedPortal: Portal<any>;
  reviewPhonePopupOverlayRef: OverlayRef;
  openReviewPhonePopupLoading: boolean = false;

  _item: Service;

  @Input() set item(service: Service) {
    this._item = service;
    this.isCalled = service?.isCalled;

    if (service.id) {
      this.phoneNumber = service.contact_number
    }

    if (this.phoneNumber) {
      this.hiddenPhoneNumber = this.phoneNumber.substring(0, this.phoneNumber.length - 2) + this.replacement;
      //WTF THIS in setter? Check and delete
      this.cdr.markForCheck();
    }

    if (this.isCalled) {
      this.showPhone = true;
      //WTF THIS in setter? Check and delete
      this.cdr.markForCheck();
    }

    this.generateLink();
  }

  @Input() set specialist(specItem: Specialist) {
    if (specItem) {
      this._specialist = specItem;
    }
  }

  @Input() isWishlist: boolean;

  @Input() isBoost: boolean;

  DEVICE = Device;
  apiUrl = apiUrl;
  link: string;
  fusilliOverlayRef: OverlayRef;

  showPhone: boolean = false;
  isCalled: boolean = false;

  _specialist: Specialist;

  generateLink() {
    this.link = `https://serwish.ge/services/${this._item.id}/${this._item.translated.slug}/?locale=${this.translateService.currentLang}`;
    this.cdr.markForCheck();
  }

  trackBy(index: number, _item: any) {
    return index;
  }

  toggleFavorite() {
    this.elementRef.nativeElement.style.display = "none";
  }

  togglePhoneNumber($event: any) {

    $event.stopPropagation()
    $event.preventDefault();

    this.showPhone = true;

    this.clickService.click(this._item.id);

    if (!this.isCalled && !this.openReviewPhonePopupLoading) {
      this.openReviewPhonePopupLoading = true;

      setTimeout(() => {
        this.openReviewPhonePopup();
      }, 5000);

    }

  }

  openSharePopup($event: any) {

    $event.stopPropagation()
    $event.preventDefault();

    const config: OverlayConfig = new OverlayConfig({
      hasBackdrop: true,
      // backdropClass: 'cdk-overlay-transparent-backdrop',
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically()
    });


    this.fusilliOverlayRef = this.overlay.create(config);
    this.fusilliOverlayRef.attach(this.templatePortal);

    this.fusilliOverlayRef.backdropClick().subscribe(() => this.fusilliOverlayRef.detach());
  }

  openReviewPhonePopup() {

    this.selectedPortal = new TemplatePortal(
      this.templatePortalContent,
      this.viewContainerRef
    );

    let config = new OverlayConfig({
      hasBackdrop: true,
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically()
    });

    this.reviewPhonePopupOverlayRef = this.overlay.create(config);
    this.reviewPhonePopupOverlayRef.attach(this.selectedPortal);
  }

  closeReviewPhonePopup() {
    this.reviewPhonePopupOverlayRef.dispose();
  }

  closeSharePopup() {
    this.fusilliOverlayRef.dispose();
  }

  boostService($event: any, id: number) {

    $event.stopPropagation()
    $event.preventDefault();

    this.boostServiceClick.emit(id);
  }


}
