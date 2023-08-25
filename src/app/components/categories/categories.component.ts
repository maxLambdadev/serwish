import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Device, LoadingStatus } from '@models/index';
import { Store } from '@ngrx/store';
import { selectCategories, selectCategoriesLoadingsStatus } from '@store/categories/categories.selectors';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';
import { filter, takeUntil } from 'rxjs/operators';
import { SWSlideInFromLeftAnimation } from '@animations/index';
import { counter } from '@utils/utils';
import { environment } from '../../../environments/environment';
const apiUrl = environment.apiUrl;

@Component({
  selector: 'sw-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [SWSlideInFromLeftAnimation]
})
export class CategoriesComponent implements AfterViewInit {

  constructor(
    private store: Store,
    private router: Router,
    private elementRef: ElementRef,
    private cdr: ChangeDetectorRef
  ) { }

  @Input() device: Device;

  @Output() closePanel: EventEmitter<any> = new EventEmitter();

  DEVICE = Device;
  apiUrl = apiUrl;

  categories$: Observable<any> = this.store.select(selectCategories);
  categoriesLoading$: Observable<any> = this.store.select(selectCategoriesLoadingsStatus);

  LOADING_STATUS = LoadingStatus;

  changeHappend: boolean;
  activeCategoryId: number;

  private unsubscribe$: Subject<null> = new Subject();

  counter = counter;

  ngAfterViewInit(): void {

    this.router.events.pipe(
      takeUntil(this.unsubscribe$),
      filter((event: any) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        if (event instanceof NavigationEnd) {
          this.closePanel.emit();
        }
      });
  }

  trackBy(index: number, _item: any) {
    return index;
  }

  changeActiveCategory(categoryId: number) {
    this.changeHappend = true;
    this.activeCategoryId = categoryId;
  }

  @HostListener('document:click', ['$event'])
  public handleClickIfOutside(event: MouseEvent): void {
    if (!event.target) {
      return;
    }

    if (this.elementRef) {
      const clickedInside = this.elementRef.nativeElement.contains(
        event.target
      );
      if (!clickedInside) {
        //  this.closePanel.emit();
      }
    }
  }


  goBack($event: any) {
    $event.stopPropagation();
    $event.preventDefault();

    this.activeCategoryId = null;
    this.cdr.markForCheck();
  }

}
