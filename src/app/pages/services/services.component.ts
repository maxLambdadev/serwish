import { Location } from "@angular/common";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostBinding,
  OnInit,
  ViewEncapsulation,
} from "@angular/core";
import { Router } from "@angular/router";
import { Ads, Device, ExtPageData, LoadingStatus, Service } from "@models/index";
import { Store } from "@ngrx/store";
import { SeoService, DeviceService, AdsService } from "@services/index";
import {
  syncSelectedCities,
  fetchServices,
  selectServices,
  selectServicesLoadingStatus,
  selectServicesPageData,
} from "@store/index";
import { counter } from "@utils/utils";
import { Observable } from "rxjs/internal/Observable";
import { Subject } from "rxjs/internal/Subject";
import { takeUntil } from "rxjs/operators";
import { SWFadeInAnimation } from "@animations/index";
import { JsonLdService } from "ngx-seo";
import { environment } from "../../../environments/environment";

@Component({
  selector: "sw-services-page",
  templateUrl: "./services.component.html",
  styleUrls: ["./services.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  animations: [SWFadeInAnimation],
})
export class ServicesComponent implements OnInit {
  @HostBinding("class.sw-services-page") className: boolean = true;

  constructor(
    private store: Store,
    private router: Router,
    private location: Location,
    private deviceService: DeviceService,
    private adsService: AdsService,
    private cdr: ChangeDetectorRef,
    private seoService: SeoService,
    private readonly jsonLdService: JsonLdService,
  ) {
    let newArray: any = [];
    let newObject: any = {};
    this.store.select(selectServices).subscribe((counter) => {
      counter.map((item) => {
        // newObject.name = item.translated.title;
        // newObject.@type = 'ListItem';
        newObject = {
          "@type": "ListItem",
          name: item.translated.title,
          url:
            "https://serwish.ge/services/details/" + item.id + "/" + item.translated.slug,
          description: item.translated.description,
          image: environment.apiUrl + "/storage/" + item.images[0]?.path,
        };
        // console.log("sasdasddjasdajksdsad");
        return newArray.push(newObject);
      });
      const jsonLdObject = this.jsonLdService.getObject("ItemList", {
        "@context": "https://schema.org",
        name: counter[0]?.categories[0].translated[0].title,
        description: counter[0]?.categories[0].translated[0].meta_description,
        itemListElement: newArray,
      });
      this.jsonLdService.setData(jsonLdObject);
      // console.log(jsonLdObject, "sdjasdajksdsad");
      // console.log(jsonLdObject, "sasdasddjasdajksdsad");
    });
  }
  device: Device = this.deviceService.getDevice();
  DEVICE = Device;

  services$: Observable<Service[]> = this.store.select(selectServices);
  servicesLoadingStatus$: Observable<LoadingStatus> = this.store.select(
    selectServicesLoadingStatus,
  );
  servicesPageData$: Observable<ExtPageData> = this.store.select(selectServicesPageData);
  servicesTotalPageCount: number;

  LOADING_STATUS = LoadingStatus;

  ads: Array<Ads>;

  private unsubscribe$: Subject<null> = new Subject();

  counter = counter;

  headerItems: Array<any> = [
    {
      title: "ტვირთების / ავეჯის გადაზიდვა",
      discription: `გთავაზობთ ავეჯის გადაზიდვას, tvirtebis gadazidvas, ტექნიკის გადაზიდვა, avejis gadazidva  თბილისში, ასევე, ავეჯის გადაზიდვა,  რუსთავში, ავეჯის გადაზიდვა ვარკეთილში. 
    აქ ნახავთ ყველაზე სწრაფ გადაზიდვა ავეჯის გადაზიდვის სერვისი. 
    გაიგებთ, ხშირად დასმულ კითვაზე პასუხს, ავეჯის გადაზიდვა რა ჯდება, (avejis gadazidva pasi) ავეჯის გადაზიდვა ფასი.
    ჩვენ შეგვიძლია ავეჯის გადაზიდვა 24 საათი.
    იპოვეთ სასურველი Gadazidva servizi. 
    teqnikis gadazidva samsheneblo masalebis gadazidva satvirtoti.
    `,
      index: 2,
      mobileIndex: 4,
    },
    {
      title: "ავეჯის გადაზიდვის სერვისი",
      discription:
        "ნებისმიერ ადგილას გთავაზობთ სამშენებლო მასალების გადაზიდვა, ტვირთის გადაზიდვა, სამშენებლო ნარჩენების გადაზიდვა, სატვირთო ავტომობილით მომსახურება.",
      index: 2,
      mobileIndex: 4,
    },
  ];

  ngOnInit(): void {
    this.store.dispatch(syncSelectedCities());

    this.adsService
      .getAds("services")
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((ads: Ads[]) => {
        this.ads = ads;
      });

    this.servicesPageData$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((pageData: ExtPageData) => {
        if (pageData?.list) {
          this.seoService.createLinkForCanonicalURL();
          this.servicesTotalPageCount = pageData.list.last_page;
        }
      });
  }

  trackBy(index: number, _item: any) {
    return index;
  }

  goBack(): void {
    this.location.back();
  }

  goHome(): void {
    this.router.navigate(["/"]);
  }

  onFilterChange(): void {
    this.activePage = 1;
    this.cdr.markForCheck();
  }

  activePage: number = 1;
  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 2;

  onScrollDown(): void {
    this.activePage++;

    if (this.servicesTotalPageCount >= this.activePage) {
      this.store.dispatch(fetchServices({ pageId: this.activePage }));
      this.cdr.detectChanges();
    }
  }

  onUp(): void {}
}
