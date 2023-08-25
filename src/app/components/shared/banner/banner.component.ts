import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { Ads } from '@models/ads';

@Component({
  selector: 'sw-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BannerComponent {


  @Input() banner: Ads;

}
