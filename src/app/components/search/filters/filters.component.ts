import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { Device, UserType } from "@models/index";
import { Store } from "@ngrx/store";
import { CitiesService } from "@services/cityService.service";
import {
  selectSelectedCategories,
  selectSelectedCities,
  toggleCategory,
  toggleCity,
  selectCategories,
  changeQualityFIlter,
  changeUserTypeFilter,
} from "@store/index";
import { Observable } from "rxjs/internal/Observable";

export enum Filters {
  SERWISH_QUALITY = "serwish-quality",
  CATEGORY = "category",
  LOCATION = "location",
  USER_TYPE = "user-type",
}

@Component({
  selector: "sw-search-filters",
  templateUrl: "./filters.component.html",
  styleUrls: ["./filters.component.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersComponent implements OnInit {
  @HostBinding("class.sw-search-filters") className: boolean = true;

  @HostBinding("class.sw-search-filters--mobile") public get isMobile(): boolean {
    return this.device === Device.MOBILE;
  }

  constructor(
    private store: Store,
    private activatedRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private citiesService: CitiesService,
  ) {}

  @Input() isServicesPage: boolean = false;

  @Input() device: Device;

  @Output() filterChange: EventEmitter<any> = new EventEmitter<any>();

  DEVICE = Device;

  categories$: Observable<any> = this.store.select(selectCategories);
  selectedCategories$: Observable<any> = this.store.select(selectSelectedCategories);

  selectedCities$: Observable<any> = this.store.select(selectSelectedCities);

  // cities: Array<any>;
  citiesLoading = false;

  FILTERS = Filters;

  status: Array<any> = [
    {
      childrens: [
        {
          checked: false,
          value: "personal",
          translated: {
            title: "ფიზიკური პირი",
          },
        },
        {
          checked: false,
          value: "business",
          translated: {
            title: "კომპანია",
          },
        },
      ],
    },
  ];

  cities: Array<any> = [
    {
      childrens: [],
    },
  ];

  serwishQualityChecked: boolean = false;

  ngOnInit(): void {
    this.citiesLoading = true;

    this.citiesService.getCitiesList().subscribe(
      (cities: Array<any>) => {
        this.cities[0].childrens = cities.map((city: any) => {
          return city;
        });

        this.cdr.markForCheck();
      },
      (_error: any) => {
        this.citiesLoading = false;
        this.cdr.markForCheck();
      },
    );

    this.activatedRoute.queryParams.subscribe((params: Params) => {
      const quality: boolean = params.quality;
      const personal: string = params.personal;

      this.serwishQualityChecked = quality ? true : false;

      if (personal === "business") {
        this.status[0].childrens[1].checked = true;
        this.status[0].childrens[0].checked = false;
      } else if (personal === "personal") {
        this.status[0].childrens[0].checked = true;
        this.status[0].childrens[1].checked = false;
      }

      if (!personal) {
        this.status[0].childrens[0].checked = false;
        this.status[0].childrens[1].checked = false;
      }

      this.cdr.markForCheck();
    });
  }

  toggleServishQualityFilter() {
    this.store.dispatch(changeQualityFIlter());
    this.filterChange.emit();
  }

  changeUserTypeFilter(userType: UserType) {
    this.store.dispatch(changeUserTypeFilter({ userType: userType }));
    this.filterChange.emit();
  }

  changeCategoryFilter(categoryId: number) {
    this.store.dispatch(toggleCategory({ categoryId: categoryId }));

    this.filterChange.emit();
  }

  changeLocationFilter(cityId: number) {
    if (cityId) {
      this.store.dispatch(toggleCity({ cityId: cityId }));
    }

    this.filterChange.emit();
  }

  showMobileFilters: boolean;

  onFiltersClick() {
    this.showMobileFilters = !this.showMobileFilters;
  }
}
