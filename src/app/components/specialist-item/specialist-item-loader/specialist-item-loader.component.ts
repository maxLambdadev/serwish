import { ChangeDetectionStrategy, Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';
import { Device } from '@models/index';

@Component({
  selector: 'sw-specialist-item-loader',
  templateUrl: './specialist-item-loader.component.html',
  styleUrls: ['./specialist-item-loader.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpecialistItemLoaderComponent {

  @HostBinding('class.sw-specialist-item-loader') className: boolean = true;

  @HostBinding('class.sw-specialist-item-loader--mobile') public get isMobile(): boolean {
    return this.device === Device.MOBILE;
  }

  @Input() device: Device;

  @Input() noneSlider: boolean;

  DEVICE = Device;
}
