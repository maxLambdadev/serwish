
import { AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Device, ClientType, User } from '@models/index';
import { Subject } from 'rxjs/internal/Subject';
import { filter, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'sw-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements AfterViewInit {

  @Output() closeProfileMenu: EventEmitter<any> = new EventEmitter<any>();

  @Output() becomeSpecialist: EventEmitter<any> = new EventEmitter<any>();

  @Output() logout: EventEmitter<any> = new EventEmitter<any>();

  @Input() user: User;

  @Input() device: Device;

  constructor(
    private router: Router
  ) { }

  CLIENT_TYPE = ClientType;
  DEVICE = Device;

  //Review Popup

  private unsubscribe$: Subject<null> = new Subject();

  ngAfterViewInit(): void {

    this.router.events.pipe(
      takeUntil(this.unsubscribe$),
      filter((event: any) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        if (event instanceof NavigationEnd) {
          this.closeProfileMenu.emit();
        }
      });

  }


  onBecomeSpecialist() {
    this.closeProfileMenu.emit();
    this.becomeSpecialist.emit();
  }

  onLogout() {
    this.logout.emit();
  }

}
