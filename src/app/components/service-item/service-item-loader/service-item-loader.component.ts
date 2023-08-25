import { ChangeDetectionStrategy, Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';
import { Device } from '@models/index';

@Component({
  selector: 'sw-service-item-loader',
  templateUrl: './service-item-loader.component.html',
  styleUrls: ['./service-item-loader.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServiceItemLoaderComponent {

  @HostBinding('class.sw-service-item-loader') className: boolean = true;

  @Input() device: Device;

  DEVICE = Device;

}
