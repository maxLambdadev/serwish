

import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Device, AppEvents } from '@models/index';
import { AppEventsService } from '@services/appEvents.service';

@Component({
  selector: 'sw-join-us',
  templateUrl: './join-us.component.html',
  styleUrls: ['./join-us.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JoinUsComponent {

  joinUsForm: UntypedFormGroup;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private appEventsService: AppEventsService
  ) {
    this.joinUsForm = new UntypedFormGroup({
      name: new UntypedFormControl('', [Validators.required]),
      type: new UntypedFormControl('personal', [Validators.required])
    });
  }

  @Input() device: Device;

  DEVICE = Device;

  APP_EVENTS = AppEvents;

  get activeType() { return this.joinUsForm.controls["type"].value }

  onSubmit(): void {

    let type = this.joinUsForm.get('type').value;
    let name = this.joinUsForm.get('name').value;

    const queryParams: Params = { type: type, name: name };

    this.router.navigate(
      [],
      {
        relativeTo: this.activatedRoute,
        queryParams: queryParams,
        queryParamsHandling: 'merge',
      }).then(() => { });

    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.body.scrollTop = 0;

    setTimeout(() => {
      this.appEventsService.setValue(AppEvents.SHOW_REGISTRATION, {
        showRegistration: true
      });
    }, 100);

  }
}
