

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Device } from '@models/index';
import { Store } from '@ngrx/store';
import { selectFaq } from '@store/faq/faq.selectors';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/operators';
import { SWCollapseAnimation } from '@animations/index';

@Component({
  selector: 'sw-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [SWCollapseAnimation]
})
export class FaqComponent implements OnInit {

  constructor(
    private store: Store,
    private cdr: ChangeDetectorRef
  ) {
  }

  @Input() device: Device;

  faq$: Observable<any> = this.store.select(selectFaq);

  _faq: Array<any> = [];

  activeQuestion: number = 0;
  activeIndex: number = 0;

  DEVICE = Device;

  private unsubscribe$: Subject<null> = new Subject();

  ngOnInit(): void {
    this.faq$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((faq: Array<any>) => {

        this._faq = faq;

        if (faq && this.device === Device.DESKTOP) {
          this.activeQuestion = faq[0]?.id;
          this.cdr.markForCheck();
        }

      });
  }

  trackBy(index: number, _item: any) {
    return index;
  }

  onQuestionClick(id: number, index: number) {

    if (this.activeQuestion === id && this.device === Device.MOBILE) {
      this.activeQuestion = null;
      this.activeIndex = null;

      return;
    }

    this.activeQuestion = id;
    this.activeIndex = index;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }

}
