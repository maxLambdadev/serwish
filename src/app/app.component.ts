import {
  Component,
  ViewEncapsulation,
  OnInit,
  ChangeDetectorRef,
  PLATFORM_ID,
  Inject,
  ApplicationRef,
  ViewChild,
} from "@angular/core";

import { HeaderComponent } from "@components/header/header.component";
import { ActivatedRoute, NavigationEnd, Params, Router } from "@angular/router";
import { isPlatformBrowser } from "@angular/common";

import { filter, first, takeUntil } from "rxjs/operators";
import { Subject } from "rxjs/internal/Subject";
import { Observable } from "rxjs/internal/Observable";

import { Store } from "@ngrx/store";
import { fetchUser, selectUser, clearAllSync } from "@store/index";
import { TranslateService } from "@ngx-translate/core";

import { TokenService, SettingsService, DeviceService } from "@services/index";
import { AppEvents, Device, Page, User } from "@models/index";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  @ViewChild(HeaderComponent) childComponent: HeaderComponent;
  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private settingsService: SettingsService,
    private translateService: TranslateService,
    private tokenService: TokenService,
    private store: Store,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private deviceService: DeviceService,
    private activatedRoute: ActivatedRoute,
    private appRef: ApplicationRef,
  ) {}

  DEVICE = Device;
  APP_EVENTS = AppEvents;
  PAGE = Page;
  device: Device = this.deviceService.getDevice();

  activePage: string = Page.HOME;

  user$: Observable<User> = this.store.select(selectUser);
  user: User;

  private unsubscribe$: Subject<null> = new Subject();

  ngOnInit(): void {
    let lang: string = "ka";

    this.user$.pipe(takeUntil(this.unsubscribe$)).subscribe((user: User) => {
      if (Object.keys(user).length !== 0) {
        if (!user.phone_number) {
          this.childComponent.addMobile();
        }
      }
    });

    if (isPlatformBrowser(this.platformId)) {
      lang = localStorage.getItem("lang");

      this.checkLocalStorage();
      this.facebookAuth();
      this.setActivePage();

      if (this.tokenService.getToken()) {
        this.store.dispatch(fetchUser());
      }
    }

    if (!lang) {
      lang = "ka";
    }

    this.settingsService.updateActiveLang(lang);
    this.translateService.setDefaultLang(lang);
    this.translateService.use(lang);
  }

  private setActivePage(): void {
    this.router.events
      .pipe(
        takeUntil(this.unsubscribe$),
        filter((event: any) => event instanceof NavigationEnd),
      )
      .subscribe((event: any) => {
        let activePage = event.url.slice(1)?.split("?")[0];

        activePage = activePage.split("#")[0];
        activePage = activePage.split("/")[0];

        this.activePage = activePage;

        this.cdr.markForCheck();
      });
  }

  private facebookAuth(): void {
    this.appRef.isStable
      .pipe(
        filter((val) => val),
        first(),
      )
      .subscribe(() => {
        this.activatedRoute.queryParams.subscribe((params: Params) => {
          let token = {
            access_token: params.token,
          };

          if (params.token) {
            this.tokenService.saveToken(token);
            this.store.dispatch(fetchUser());

            this.router.navigate([], {
              relativeTo: this.activatedRoute,
              queryParams: {
                token: null,
              },
              queryParamsHandling: "merge",
            });
          }
        });
      });
  }

  private checkLocalStorage(): void {
    let hours: number = 3;
    let now: any = new Date().getTime();
    let setupTime: any = localStorage.getItem("setupTime");

    if (setupTime == null) {
      localStorage.setItem("setupTime", now);
    } else {
      if (now - setupTime > hours * 60 * 60 * 1000) {
        this.store.dispatch(clearAllSync());
        localStorage.clear();
        localStorage.setItem("setupTime", now);
      }
    }
  }
}
