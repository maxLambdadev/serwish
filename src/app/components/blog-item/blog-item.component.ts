
import { ChangeDetectionStrategy, Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';
import { Blog, Device } from '@models/index';
import { environment } from '../../../environments/environment';
const apiUrl = environment.apiUrl;
@Component({
  selector: 'sw-blog-item',
  templateUrl: './blog-item.component.html',
  styleUrls: ['./blog-item.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogItemComponent {

  @HostBinding('class.sw-blog-item') className: boolean = true;

  @HostBinding('class.sw-blog-item--mobile') public get isMobile(): boolean {
    return this.device === Device.MOBILE;
  }

  @Input() blog: Blog;

  @Input() device: Device;
  apiUrl = apiUrl;

  DEVICE = Device;

}
