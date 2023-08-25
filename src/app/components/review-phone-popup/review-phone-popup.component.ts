import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { Specialist } from '@models/index';
import { Store } from '@ngrx/store';
import { PhoneReviewService } from '@services/phoneReview.service';
import { toggleCalledService, toggleCalledSpecialists } from '@store/sync/sync.actions';
import { environment } from '../../../environments/environment';
const apiUrl = environment.apiUrl;

@Component({
  selector: 'sw-review-phone-popup',
  templateUrl: './review-phone-popup.component.html',
  styleUrls: ['./review-phone-popup.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReviewPhonePopupComponent {

  constructor(private store: Store, private phoneReviewService: PhoneReviewService, private cdr: ChangeDetectorRef) { }

  @Output() closePhoneReviewPopup: EventEmitter<any> = new EventEmitter<any>();


  @Input() set specialist(specItem: Specialist) {
    if (specItem) {
      this._specialist = specItem;
      //WTF THIS? Check and delete
      this.cdr.markForCheck();
    }
  }

  _specialist: Specialist;

  @Input() serviceId: number;

  @Input() specialistId: number;

  apiUrl = apiUrl;

  onClosePopup() {
    this.closePhoneReviewPopup.emit();
  }

  onSubmit(value: number) {

    if (this.serviceId) {
      this.phoneReviewService.servicePhoneReview(this.serviceId, value).subscribe((_res: any) => {
      }, (_error: any) => {

      });

      if (value === 4 || value === 5) {
        this.store.dispatch(toggleCalledService({ id: this.serviceId }));
      }

    } else if (this.specialistId) {

      this.phoneReviewService.specialistPhoneReview(this.specialistId, value).subscribe((_res: any) => {

      }, (_error: any) => {

      });

      if (value === 4 || value === 5) {
        this.store.dispatch(toggleCalledSpecialists({ id: this.specialistId }));
      }

    }


    this.closePhoneReviewPopup.emit();
  }



}
