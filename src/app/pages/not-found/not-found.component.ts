import { ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation } from "@angular/core";
import { Device } from "@models/index";
import { DeviceService } from "@services/device.service";

@Component({
    selector: 'sw-not-found-page',
    templateUrl: './not-found.component.html',
    styleUrls: ['./not-found.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class NotFoundComponent {

    constructor(
        private deviceService: DeviceService
    ) { }

    device: Device = this.deviceService.getDevice();
    DEVICE = Device;

    @HostBinding('class.sw-not-found-page') className: boolean = true;

}