

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, ViewEncapsulation } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Device } from '@models/index';
import { Store } from '@ngrx/store';
import { RequestServiceService, SmsService } from '@services/index';
import { selectCategories } from '@store/categories/categories.selectors';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'sw-service-request',
  templateUrl: './service-request.component.html',
  styleUrls: ['./service-request.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServiceRequestComponent {

  servieRequestForm: UntypedFormGroup;

  constructor(
    private store: Store,
    private smsService: SmsService,
    private requestServiceService: RequestServiceService,
    private cdr: ChangeDetectorRef
  ) {
    this.servieRequestForm = new UntypedFormGroup({
      phone_number: new UntypedFormControl('', { validators: [Validators.required, Validators.minLength(9)] }),
      category_id: new UntypedFormControl(null, [Validators.required]),
      sms_validation: new UntypedFormControl({ value: '', disabled: true }, { validators: [Validators.required, Validators.minLength(4), Validators.maxLength(4)] }),
    });
  }

  @Input() device: Device;

  DEVICE = Device;

  categories$: Observable<any> = this.store.select(selectCategories);
  sentSuccess: boolean = false;

  isLoadingResults: boolean;

  get categoryId() { return this.servieRequestForm.get('category_id'); }


  counter: number = 30;

  private unsubscribe$: Subject<null> = new Subject();

  onSubmit(): void {
    if (this.servieRequestForm.valid) {
      this.requestServiceService.requestService(this.servieRequestForm.value)
        .subscribe(() => {
          this.isLoadingResults = false;
          this.sentSuccess = true;
          this.showCode = false;
          this.servieRequestForm.controls['sms_validation'].disable();
          this.servieRequestForm.reset();

          this.cdr.detectChanges();

        }, (_error: any) => {
          this.isLoadingResults = false;
          this.cdr.markForCheck();
        });
    }
  }

  showCode: boolean;

  onPhoneCheck(): void {
    if (this.servieRequestForm.valid) {

      let phoneNumber: number = parseInt(this.servieRequestForm.controls["phone_number"].value);

      this.smsService.sendSMS(phoneNumber).pipe(takeUntil(this.unsubscribe$))
        .subscribe(() => {
          this.showCode = true;
          this.servieRequestForm.controls['sms_validation'].enable();

          this.cdr.detectChanges();

          let intervalId = setInterval(() => {
            this.counter = this.counter - 1;
            if (this.counter === 0) {
              this.counter = 30;
              clearInterval(intervalId)
            }
            this.cdr.detectChanges();
          }, 1000)

        });


    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }

}
