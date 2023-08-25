import { ChangeDetectionStrategy, Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';
import { Device } from '@models/index';

@Component({
  selector: 'sw-service-item-loader-mobile',
  templateUrl: './service-item-loader-mobile.component.html',
  styleUrls: ['./service-item-loader-mobile.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServiceItemMobileLoaderComponent {

  @HostBinding('class.sw-service-item-loader-mobile') className: boolean = true;

  @Input() device: Device;

  DEVICE = Device;

}
