
import { ChangeDetectionStrategy, Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';
import { Device, Specialist } from '@models/index';
import { environment } from '../../../environments/environment';
const apiUrl = environment.apiUrl;

@Component({
  selector: 'sw-specialist-item',
  templateUrl: './specialist-item.component.html',
  styleUrls: ['./specialist-item.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpecialistItemComponent {

  @HostBinding('class.sw-specialist-item') className: boolean = true;

  @HostBinding('class.sw-specialist-item--mobile') public get isMobile(): boolean {
    return this.device === Device.MOBILE;
  }


  @Input() item: Specialist;

  @Input() device: Device;

  @Input() noneSlider: boolean;

  DEVICE = Device;
  apiUrl = apiUrl;

}
