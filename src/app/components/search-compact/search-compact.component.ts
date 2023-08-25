import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  ElementRef,
  ViewChild,
  Inject,
  PLATFORM_ID,
  OnDestroy,
  EventEmitter,
  Output,
  HostBinding,
  AfterViewInit,
  ApplicationRef,
  ChangeDetectorRef,
  HostListener,
  Input
} from '@angular/core';
import { LoadingStatus, Device } from '@models/index';
import { TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser, Location } from '@angular/common';
import { debounceTime, distinctUntilChanged, filter, first, map } from 'rxjs/operators';
import { SearchService } from '@services/search.service';
import { Params, Router } from '@angular/router';
import { fromEvent } from 'rxjs/internal/observable/fromEvent';
import { Subject } from 'rxjs/internal/Subject';
import { environment } from '../../../environments/environment';
const apiUrl = environment.apiUrl;

@Component({
  selector: 'sw-search-compact',
  templateUrl: './search-compact.component.html',
  styleUrls: ['./search-compact.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchCompactComponent implements AfterViewInit, OnDestroy {

  @HostBinding('class.sw-search-compact') className: boolean = true;

  @HostBinding('class.sw-search-compact--mobile') public get isMobile(): boolean {
    return this.device === Device.MOBILE;
  }

  @ViewChild('searchField', { static: false }) searchField: ElementRef;

  @ViewChild('search', { static: true }) search: ElementRef;

  constructor(
    private location: Location,
    private translateService: TranslateService,
    @Inject(PLATFORM_ID) private platformId: any,
    private appRef: ApplicationRef,
    private searchService: SearchService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) { }

  LOAIDING_STATUSES = LoadingStatus;

  @Input() device: Device;

  @Output() closeSearch: EventEmitter<any> = new EventEmitter();

  DEVICE = Device;
  apiUrl = apiUrl;

  stocksLength: number = 0;
  arrowKeyLocation: number = 0;


  wordArray: string[] = [];

  searchText: string = '';
  isSearching: boolean;

  searchItems: any;

  private unsubscribe$: Subject<null> = new Subject();

  ngAfterViewInit(): void {

    if (isPlatformBrowser(this.platformId)) {

      this.appRef.isStable
        .pipe(
          filter(val => val),
          first()
        )
        .subscribe(() => {

          this.updatePlaceholders();

          this.translateService.onLangChange.subscribe(() => {
            this.updatePlaceholders();
          });

          fromEvent(this.searchField.nativeElement, 'keyup').pipe(
            map((event: any) => {
              return event.target.value;
            })
            , filter(res => res.length > 2)
            , debounceTime(500)
            , distinctUntilChanged()
          ).subscribe((text: string) => {

            this.isSearching = true;

            this.searchService.getSearchItems(text)
              .subscribe((res: any) => {

                this.isSearching = false;
                this.searchItems = res;
                this.cdr.detectChanges();
              }, (_error: any) => {
                this.isSearching = false;
                this.cdr.detectChanges();
                this.searchItems = [];
              });

            this.cdr.detectChanges();
          });

        });

    }

  }

  updatePlaceholders() {
    clearTimeout(this.tyipngTimeout);
    clearTimeout(this.deletingTimeout);

    if (this.textElement) {
      this.textElement.nativeElement.innerHTML = '';
    }

    this.translateService.get('Search.PLACEHOLDERS').subscribe((data: any) => {

      this.wordArray = [
        data.PLACEHOLDER1,
        data.PLACEHOLDER2,
        data.PLACEHOLDER3,
      ]

      this.typingEffect();

    });
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

  goBack() {
    this.location.back();
  }

  onCloseSearch() {
    this.closeSearch.emit();
  }

  onGoSearch() {
    const queryParams: Params = { searchText: this.searchText };

    this.router.navigate(['/search'], {
      queryParams: queryParams,
      queryParamsHandling: 'merge', // remove to replace all query params by provided,
    });
  }

  ///////////////////////////

  @ViewChild("textElement") textElement: ElementRef;
  @ViewChild("blinkElement") blinkElement: ElementRef;

  typingSpeedMilliseconds = 200;
  deleteSpeedMilliseconds = 100;

  tyipngTimeout: any;
  deletingTimeout: any;

  private i = 0;

  private typingEffect(): void {


    const word = this.wordArray[this.i].split("");
    const loopTyping = () => {
      if (word.length > 0) {
        if (this.textElement) {
          this.textElement.nativeElement.innerHTML += word.shift();
        }
      } else {
        this.deletingEffect();
        return;
      }
      this.tyipngTimeout = setTimeout(loopTyping, this.typingSpeedMilliseconds);
    };
    loopTyping();

  }

  private deletingEffect(): void {
    const word = this.wordArray[this.i].split("");
    const loopDeleting = () => {
      if (word.length > 0) {
        word.pop();
        if (this.textElement) {
          this.textElement.nativeElement.innerHTML = word.join("");
        }
      } else {
        if (this.wordArray.length > this.i + 1) {
          this.i++;
        } else {
          this.i = 0;
        }
        this.typingEffect();
        return false;
      }
      this.deletingTimeout = setTimeout(loopDeleting, this.deleteSpeedMilliseconds);
      return true;
    };
    loopDeleting();
  }

  trackBySearch(_index: number, item: any) {
    return item.id;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }
}
