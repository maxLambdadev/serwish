import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { Device } from '@models/index';
import { DeviceService } from '@services/device.service';

@Component({
  selector: 'sw-text-page',
  templateUrl: './text-page.component.html',
  styleUrls: ['./text-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextPageComponent {

  DEVICE = Device;

  constructor(
    private deviceService: DeviceService,
  ) {
  }

  device: Device = this.deviceService.getDevice();
}
