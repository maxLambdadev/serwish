import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  Output,
  ViewEncapsulation,
} from "@angular/core";
import { Device } from "@models/index";

import { OverFlowService } from "@services/overflow.service";

import { SWFadeInAnimation, SWSlideInOutAnimation } from "@animations/index";
@Component({
  selector: "sw-side-panel",
  templateUrl: "./sidepanel.component.html",
  styleUrls: ["./sidepanel.component.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [SWFadeInAnimation, SWSlideInOutAnimation],
})
export class SidePanelComponent implements AfterViewInit, OnDestroy {
  @HostBinding("class.sw-side-panel") className: Boolean = true;

  @HostBinding("class.sw-side-panel--underHeader") get isUnderHeader(): boolean {
    return this.underHeader;
  }

  constructor(private overFlowService: OverFlowService) {}

  @Input() underHeader: boolean;

  @Input() device: Device;

  @Output() closePanel: EventEmitter<any> = new EventEmitter();

  @Input() className1: string;

  DEVICE = Device;

  getNgClassObject(): any {
    let ngClassObject: any = {
      "sw-side-panel__content--underHeader": this.underHeader,
      "sw-side-panel__content--mobile": this.device === this.DEVICE.MOBILE,
    };

    if (this.className1) {
      ngClassObject[this.className1] = true;
    }

    return ngClassObject;
  }

  ngAfterViewInit(): void {
    this.overFlowService.hide();
  }

  onPanelClose($event: any): void {
    this.overFlowService.show();
    this.closePanel.emit($event);
  }

  ngOnDestroy(): void {
    this.overFlowService.show();
  }
}
