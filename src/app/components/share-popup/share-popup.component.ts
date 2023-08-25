import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output, ViewEncapsulation } from '@angular/core';
import { Device } from '@models/index';
import { SOCIAL_NETWORKS } from 'src/app/config/config';

@Component({
  selector: 'sw-share-popup',
  templateUrl: './share-popup.component.html',
  styleUrls: ['./share-popup.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SharePopupComponent {

  @HostBinding('class.sw-share-popup') className: boolean = true;

  @HostBinding('class.sw-share-popup--mobile') public get isMobile(): boolean {
    return this.device === Device.MOBILE;
  }

  @Output() closeSharePopup: EventEmitter<any> = new EventEmitter<any>();

  socials = SOCIAL_NETWORKS;
  isCopied: boolean = false;

  @Input() set link(link: string) {

    if (link) {
      this._link = link.replace('https://', '');
    }

  }

  @Input() device: Device;

  DEVICE = Device;

  _link: string;

  onClosePopup(): void {
    this.closeSharePopup.emit();
  }

  async onCopy() {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = 'https://' + this._link;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    this.isCopied = document.execCommand('copy');
    document.body.removeChild(selBox);
  }

}
