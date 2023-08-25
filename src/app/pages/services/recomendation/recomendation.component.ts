import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output, ViewEncapsulation } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Device, Service, Specialist } from '@models/index';
import { RecomendationService } from '@services/recomendation.service';
import { environment } from '../../../../environments/environment';
const apiUrl = environment.apiUrl;

@Component({
  selector: 'sw-recomendation',
  templateUrl: './recomendation.component.html',
  styleUrls: ['./recomendation.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecomendationComponent {

  @HostBinding('class.sw-recomendation') className: boolean = true;

  @HostBinding('class.sw-recomendation--mobile') public get isMobile(): boolean {
    return this.device === Device.MOBILE;
  }

  constructor(
    private recomendationService: RecomendationService
  ) {

    this.recomendationForm = new UntypedFormGroup({
      description: new UntypedFormControl('', { validators: Validators.required })
    });

  }

  recomendationForm: UntypedFormGroup;

  @Input() device: Device;

  @Input() service: Service;

  @Input() specialist: Specialist;

  @Output() closeRecomendationPopup: EventEmitter<any> = new EventEmitter<any>();

  DEVICE = Device;
  apiUrl = apiUrl;

  activeType: number = 1

  submitReview(): void {

    let reviewDraft: any = {
      description: this.recomendationForm.controls['description'].value,
      likes: this.activeType,
      service_id: this.service?.id
    }

    this.recomendationService
      .addReview(reviewDraft)
      .subscribe(() => {
        this.closeRecomendationPopup.emit();
      })
  }

  onChanteType(activeType: number) {
    this.activeType = activeType;
  }

  closePopup() {
    this.closeRecomendationPopup.emit();
  }

}
