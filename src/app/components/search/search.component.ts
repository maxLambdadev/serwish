import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
  ElementRef,
  ViewChild,
  OnDestroy,
  EventEmitter,
  Output,
  HostBinding,
  Input,
  AfterViewInit,
  Inject,
  PLATFORM_ID,
  ApplicationRef,
  ChangeDetectorRef,
  HostListener
} from '@angular/core';
import { LoadingStatus, Device } from '@models/index';
import { isPlatformBrowser, Location } from '@angular/common';
import { debounceTime, distinctUntilChanged, filter, first, map } from 'rxjs/operators';
import { SearchService, DeviceService } from '@services/index';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SWFadeInAnimation } from '@animations/index';
import { Subject } from 'rxjs/internal/Subject';
import { fromEvent } from 'rxjs/internal/observable/fromEvent';
import { environment } from '../../../environments/environment';
const apiUrl = environment.apiUrl;

@Component({
  selector: 'sw-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    SWFadeInAnimation
  ],
})
export class SearchComponent implements OnInit, AfterViewInit, OnDestroy {

  @HostBinding('class.sw-search') className: boolean = true;

  @HostBinding('class.sw-search--page') get isUnderHeader() {
    return this.isSearchPage;
  }

  @HostBinding('class.sw-search--mobile') get isMobile() {
    return this.device === Device.MOBILE;
  }

  @ViewChild('searchField', { static: false }) searchField: ElementRef;

  @ViewChild('search', { static: true }) search: ElementRef;

  @Input() isSearchPage: boolean = false;

  @Input() isServicesPage: boolean = false;

  constructor(
    private location: Location,
    @Inject(PLATFORM_ID) private platformId: any,
    private appRef: ApplicationRef,
    private searchService: SearchService,
    private cdr: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private deviceService: DeviceService
  ) { }

  LOAIDING_STATUSES = LoadingStatus;

  @Output() closeSearch: EventEmitter<any> = new EventEmitter();

  @Output() filterChange: EventEmitter<any> = new EventEmitter<any>();

  private unsubscribe$: Subject<null> = new Subject();

  device: Device = this.deviceService.getDevice();
  DEVICE = Device;
  apiUrl = apiUrl;

  stocksLength: number = 0;
  arrowKeyLocation: number = 0;

  wordArray: string[] = [];

  searchText: string = '';
  isSearching: boolean;

  searchItems: any;

  ngOnInit(): void {

    if (this.isSearchPage) {
      this.activatedRoute.queryParams
        .subscribe((params: Params) => {
          const searchText = params['searchText'];
          if (searchText) {
            this.searchText = searchText;
            this.searchApi(searchText);
            this.cdr.markForCheck();
          }
        });
    }

  }

  searchApi(text: string) {
    this.searchService.getSearchItems(text)
      .subscribe((res: any) => {
        this.isSearching = false;
        this.searchItems = res;
        this.cdr.detectChanges();
      }, (_error: any) => {
        this.isSearching = false;
        this.searchItems = [];
        this.cdr.detectChanges();
      });

  }

  ngAfterViewInit(): void {

    if (isPlatformBrowser(this.platformId)) {

      this.appRef.isStable
        .pipe(
          filter(val => val),
          first()
        )
        .subscribe(() => {

          if ((this.device === Device.DESKTOP || this.isSearchPage) && this.searchField?.nativeElement) {
            fromEvent(this.searchField?.nativeElement, 'keyup').pipe(
              map((event: any) => {
                return event.target.value;
              })
              , filter(res => res.length > 2)
              , debounceTime(500)
              , distinctUntilChanged()
            ).subscribe((text: string) => {

              this.isSearching = true;
              this.cdr.detectChanges();

              this.searchApi(text);

            });
          }

        });


    }

  }

  onFocus() {
    this.collapsed = false;
  }

  collapsed: boolean = false;

  @HostListener('document:click', ['$event'])
  public handleClickIfOutside(event: MouseEvent): void {
    if (!event.target) {
      return;
    }

    if (this.search) {
      const clickedInside = this.search.nativeElement.contains(
        event.target
      );
      if (!clickedInside) {
        this.collapsed = true;
      }
    }
  }


  clearInput() {
    this.searchText = '';
  }

  keyUp(event: KeyboardEvent) {
    event.stopPropagation()
    event.preventDefault();

    if (!this.isSearchPage) {
      const queryParams: Params = { searchText: this.searchText };

      switch (event.key) {
        case 'Enter':
          if (this.arrowKeyLocation >= 0) {
            this.router.navigate(['/search'], {
              queryParams: queryParams,
              queryParamsHandling: 'merge', // remove to replace all query params by provided,
            });
          }
          break;
      }
    }
  }

  goBack() {
    this.location.back();
  }

  onCloseSearch() {
    this.closeSearch.emit();
  }

  onGoSearch(): void {
    if (!this.isSearchPage) {
      const queryParams: Params = { searchText: this.searchText };

      this.router.navigate(['/search'], {
        queryParams: queryParams,
        queryParamsHandling: 'merge', // remove to replace all query params by provided,
      });
    }

  }

  ///////////////////////////

  @ViewChild("textElement") textElement: ElementRef;
  @ViewChild("blinkElement") blinkElement: ElementRef;

  typingSpeedMilliseconds = 200;
  deleteSpeedMilliseconds = 100;

  tyipngTimeout: any;
  deletingTimeout: any;

  onFilterChange() {
    this.filterChange.emit();
  }

  trackBySearch(_index: number, item: any) {
    return item.id;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }
}
