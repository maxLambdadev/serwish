import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from "@angular/core";
import { AuthType, Device } from "@models/index";
import { SWSlideUpDownAnimation } from "@animations/index";

@Component({
  selector: "sw-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [SWSlideUpDownAnimation],
})
export class AuthComponent {
  @Output() closeSidePanel: EventEmitter<any> = new EventEmitter<any>();

  @Output() changeAuthTab: EventEmitter<any> = new EventEmitter<any>();
  @Output() changeAndClose: EventEmitter<any> = new EventEmitter<any>();

  constructor(private cdr: ChangeDetectorRef) {}

  AUTHTYPE = AuthType;

  @Input() set activeAuthType(authType: AuthType) {
    this._activeAuthType = authType;
  }

  @Input() device: Device;

  _activeAuthType: AuthType = AuthType.LOGIN;

  passWordChangeSuccessStatus: boolean;

  onChangeAuthTab(authType: AuthType) {
    this.activeAuthType = authType;
    this.changeAuthTab.emit(authType);
  }

  onCloseSidePanel() {
    this.closeSidePanel.emit();
  }

  onCloseSidebar() {
    this.closeSidePanel.emit();
  }

  onChangeAndClose() {
    this.activeAuthType = AuthType.LOGIN;
    this.changeAndClose.emit();
  }

  passWordChangeSuccess() {
    this.passWordChangeSuccessStatus = true;

    setTimeout(() => {
      this.passWordChangeSuccessStatus = false;
      this.cdr.markForCheck();
    }, 5000);
  }
}
