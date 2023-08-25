import { ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Device, Page } from '@models/index';
import { SWCollapseAnimation } from '@animations/index';
import { SOCIAL_NETWORKS } from 'src/app/config/config';

@Component({
  selector: 'sw-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [SWCollapseAnimation]
})
export class FooterComponent implements OnInit {

  @Input() device: Device;
  @Input() activePage: Page;

  DEVICE = Device;
  PAGES = Page;
  socials = SOCIAL_NETWORKS;

  currentYear: number = new Date().getFullYear();

  sitemapUrl: string = '';
  activeMenu: number = 1;

  ngOnInit(): void {
    this.sitemapUrl = `https://serwish.ge/sitemap.xml`
  }

  scrollTo(fragment: string): void {
    if (fragment) {
      document
        .querySelector('#' + fragment)
        .scrollIntoView({ behavior: 'smooth' });
    }
  }

  toggleMenu(index: number): void {
    this.activeMenu = index;
  }

  trackBy(index: number, _item: any) {
    return index;
  }

}
