import { CdkOverlayOrigin, Overlay, OverlayConfig } from "@angular/cdk/overlay";
import { CdkPortal } from "@angular/cdk/portal";
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { Device } from "@models/index";
import { Store } from "@ngrx/store";
import { removeCategories, removeCities } from "@store/router/router.actions";
import { Subject } from "rxjs/internal/Subject";
import { filter, takeUntil } from "rxjs/operators";
import { Filters } from "../filters.component";

@Component({
  selector: "sw-search-filters-item",
  templateUrl: "./filters-item.component.html",
  styleUrls: ["./filters-item.component.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersItemComponent implements AfterViewInit {
  @HostBinding("class.sw-search-filters-item") className: boolean = true;

  @HostBinding("class.sw-search-filters-item--static") public get isMobile(): boolean {
    return this.isStatic;
  }

  @ViewChild("filterOverlayOrigin") filterOverlayOrigin!: CdkOverlayOrigin;
  @ViewChild("filterOverlayTemplate") filterOverlayTemplate!: CdkPortal;

  constructor(
    private elementRef: ElementRef,
    private store: Store,
    private overlay: Overlay,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {}

  @Input() device: Device;

  DEVICE = Device;

  @Input() type: string = "dropdown";

  @Input() title: string;

  @Input() hasScroll: boolean;

  @Input() filterName: Filters;

  @Input() selectedCategories: Array<number>;

  @Input() selectedCities: Array<number>;

  @Input() set items(items: Array<any>) {
    this._items = items;
  }

  @Input() set active(isActive: boolean) {
    this._active = isActive;
  }

  @Input() isStatic: boolean = false;

  @Input() isCategory: boolean = false;

  @Output() toggleServishQualityFilterClick: EventEmitter<any> = new EventEmitter<any>();

  @Output() changeFilterClicked: EventEmitter<any> = new EventEmitter<any>();

  FILTERS = Filters;

  _items: Array<any>;
  _active: boolean = false;

  collapsed: boolean = true;

  isStaticActive: boolean = false;

  private unsubscribe$: Subject<null> = new Subject();

  ngAfterViewInit(): void {
    this.router.events
      .pipe(
        takeUntil(this.unsubscribe$),
        filter((event: any) => event instanceof NavigationEnd),
      )
      .subscribe((event: any) => {
        if (event instanceof NavigationEnd) {
          if (this.overlayRef) {
            this.overlayRef.detach();
            this.overlayRef = null;
          }
        }
      });
  }

  @HostListener("document:click", ["$event"])
  public handleClickIfOutside(event: MouseEvent): void {
    if (!event.target) {
      return;
    }

    if (this.elementRef) {
      const clickedInside = this.elementRef.nativeElement.contains(event.target);
      if (!clickedInside) {
        this.collapsed = true;
        this.isStaticActive = false;

        if (this.overlayRef) {
          this.overlayRef.detach();
          this.overlayRef = null;
        }
      }
    }
  }

  isActive: boolean = false;

  toggleDropdown(): void {
    if (!this.isStatic) {
      this.openTooltip();
    } else {
      this.isActive = !this.isActive;
    }
    this.cdr.markForCheck();
  }

  toggleServishQualityFilter(): void {
    this.toggleServishQualityFilterClick.emit();
  }

  changeFilter(filterValue: any, $event: any): void {
    $event.stopPropagation();

    this.isStaticActive = !this.isStaticActive;
    this.changeFilterClicked.emit(filterValue);
  }

  clearCategories($event: any): void {
    $event.stopPropagation();
    this.store.dispatch(removeCategories());
  }

  clearCities($event: any): void {
    $event.stopPropagation();
    this.store.dispatch(removeCities());
  }

  trackBy(index: number, _item: any) {
    return index;
  }

  overlayRef: any;

  openTooltip() {
    this.isStaticActive = !this.isStaticActive;

    if (this.overlayRef) {
      this.overlayRef.detach();
      this.overlayRef = null;
    } else {
      let strategy = this.overlay
        .position()
        .flexibleConnectedTo(this.filterOverlayOrigin.elementRef)
        .withPositions([
          {
            originX: "end",
            originY: "top",
            overlayX: "start",
            overlayY: "top",
            offsetX: 0,
            offsetY: 24,
          },
        ]);

      const config: OverlayConfig = new OverlayConfig({
        positionStrategy: strategy,
        scrollStrategy: this.overlay.scrollStrategies.close(),
      });

      this.overlayRef = this.overlay.create(config);
      this.overlayRef.attach(this.filterOverlayTemplate);
    }
  }
}
