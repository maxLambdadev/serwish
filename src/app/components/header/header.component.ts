import { Overlay, OverlayConfig, OverlayRef } from "@angular/cdk/overlay";
import { Portal, TemplatePortal } from "@angular/cdk/portal";
import {
  ApplicationRef,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation,
} from "@angular/core";
import { Router } from "@angular/router";
import {
  Device,
  ClientType,
  User,
  AuthType,
  LoadingStatus,
  Page,
  AppEvents,
} from "@models/index";
import { Store } from "@ngrx/store";
import { logoutUser, selectIsAuth, selectUser } from "@store/index";
import { filter, first, takeUntil, map, tap } from "rxjs/operators";
import { SOCIAL_NETWORKS } from "src/app/config/config";
import { isPlatformBrowser } from "@angular/common";
import { AppEventsService, AuthService } from "@services/index";
import { scrollDistance } from "@utils/utils";
import { SWSlideInFromTopAnimation } from "@animations/index";
import { Observable } from "rxjs/internal/Observable";
import { Subject } from "rxjs/internal/Subject";

import { Actions, ofType } from "@ngrx/effects";
import { RouterNavigatedAction, ROUTER_NAVIGATED } from "@ngrx/router-store";

import {
  selectCategories,
  selectCategoriesLoadingsStatus,
} from "@store/categories/categories.selectors";

import { RouterStateUrl } from "src/app/sw-route.serilizer";

// import SwiperCore, { Pagination, Navigation, EffectFade } from "swiper";

// SwiperCore.use([Pagination, Navigation, EffectFade]);
import { SwiperComponent } from "swiper/angular";

import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Virtual,
  Zoom,
  Autoplay,
  Thumbs,
  Controller,
} from "swiper";

SwiperCore.use([
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Virtual,
  Zoom,
  Autoplay,
  Thumbs,
  Controller,
]);

// import { environment } from '../../../environments/environment';
import { environment } from "src/environments/environment";

const apiUrl = environment.apiUrl;

@Component({
  selector: "sw-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [SWSlideInFromTopAnimation],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @HostBinding("class.sw-header-wrapper") className: boolean = true;

  @HostBinding("class.sw-header-wrapper--sticky") public get sticky(): boolean {
    return this.isSticky;
  }

  @HostBinding("class.sw-header-wrapper--mobile") public get isMobile(): boolean {
    return this.device === Device.MOBILE;
  }

  //Portals
  @ViewChild("addServiceTemplatePortalContent")
  addServiceTemplatePortalContent: TemplateRef<unknown>;

  @ViewChild("loginTemplatePortalContent") loginTemplatePortalContent: TemplateRef<
    unknown
  >;

  @ViewChild("swiper", { static: false }) swiper?: SwiperComponent;

  @ViewChild("specialistInfoTemplatePortalContent")
  specialistInfoTemplatePortalContent: TemplateRef<unknown>;

  scrollDistance = scrollDistance;

  @Input() device: Device;
  @Input() isSticky: boolean = false;

  socials = SOCIAL_NETWORKS;
  LOADING_STATUS = LoadingStatus;
  CLIENT_TYPE = ClientType;

  showLogin: boolean = false;
  showCategories: boolean = false;
  showProfile: boolean = false;

  isAuth$: Observable<boolean> = this.store.select(selectIsAuth);
  user$: Observable<User> = this.store.select(selectUser);

  isAuth: boolean;
  _user: User;

  activeAuthType: AuthType = AuthType.LOGIN;
  APP_EVENTS = AppEvents;
  clientType: ClientType;

  //Add Service Popup
  addServiceOverlayRef: OverlayRef;

  //Login Popup
  loginPopupOverlayRef: OverlayRef;

  //Specialist Info Popup
  specialistInfoPopupOverlayRef: OverlayRef;

  DEVICE = Device;

  categories$: Observable<any> = this.store.select(selectCategories);
  categoriesLoading$: Observable<any> = this.store.select(selectCategoriesLoadingsStatus);

  private unsubscribe$: Subject<null> = new Subject();

  apiUrl = apiUrl;

  showCategoriesModal: boolean = false;
  selectedCategory: any;

  constructor(
    @Inject(PLATFORM_ID) private platformId: {},
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private store: Store,
    private overlay: Overlay,
    private appEventsService: AppEventsService,
    private elementRef: ElementRef,
    private viewContainerRef: ViewContainerRef,
    private appRef: ApplicationRef,
    private actions$: Actions,
  ) {
    this.user$.pipe(takeUntil(this.unsubscribe$)).subscribe((user: User) => {
      this.clientType = user.client_type;
      this._user = user;
      this.cdr.markForCheck();
    });
  }

  @Input() set activePage(activePage: Page) {
    if (isPlatformBrowser(this.platformId)) {
      this.moveArrow(activePage);
    }
  }

  lastScrollTop: number = -1;

  myActions$: Observable<any> = this.actions$;
  scrollToActiveCategory(data: any) {
    let category = Number(data.categories);
    let matchFound = false;

    this.categories$.subscribe((categories: any[]) => {
      categories.forEach((c: any, index: number) => {
        if (matchFound) {
          return;
        }

        if (c.id === category) {
          this.swiper.swiperRef.slideTo(index, 1000, true);
          matchFound = true;
          return;
        }
        c.childrens.forEach((child: any) => {
          if (matchFound) {
            return;
          }
          if (child.id === category) {
            this.swiper.swiperRef.slideTo(index, 1000, true);
            matchFound = true;
          }
        });
      });
    });
  }

  ngOnInit(): void {
    this.myActions$
      .pipe(
        ofType(ROUTER_NAVIGATED),
        filter((action: RouterNavigatedAction<RouterStateUrl>) => {
          const url: string = action.payload.routerState.url;
          const isDetails: boolean = action.payload.routerState.url.includes("details");
          return url.startsWith("/services/") && !isDetails;
        }),
        map((action: RouterNavigatedAction<RouterStateUrl>) => {
          const queryParams = action.payload.routerState.queryParams;
          return {
            payload: queryParams,
          };
        }),
        tap((action) => {
          this.scrollToActiveCategory(action.payload);
        }),
      )
      .subscribe();

    if (isPlatformBrowser(this.platformId)) {
      this.appRef.isStable
        .pipe(
          filter((val) => val),
          first(),
        )
        .subscribe(() => {
          this.scrollDistance((distance: number, scrollFromTop: number) => {
            let dashboardFilters = this.elementRef.nativeElement;

            if (dashboardFilters) {
              if (distance > 0) {
                dashboardFilters.classList.add("sw-header-wrapper--up");
                dashboardFilters.classList.remove("sw-header-wrapper--down");
              }

              if (scrollFromTop < 100) {
                dashboardFilters.classList.add("sw-header-wrapper--down");
                dashboardFilters.classList.remove("sw-header-wrapper--up");
              }
            }
          });
        });
    }

    this.isAuth$.pipe(takeUntil(this.unsubscribe$)).subscribe((isAuth: boolean) => {
      this.isAuth = isAuth;
      this.cdr.markForCheck();
      this.cdr.detectChanges();
    });

    this.appEventsService
      .on(this.APP_EVENTS.SHOW_REGISTRATION)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((showRegistration: boolean) => {
        if (showRegistration) {
          this.toggleLogin();
          this.activeAuthType = AuthType.REGISTRATION_SPECIALIST;
          this.cdr.markForCheck();
        }
      });

    this.appEventsService
      .on(this.APP_EVENTS.SHOW_CATEGORIES)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((showCategories: boolean) => {
        if (showCategories) {
          this.toggleCategories();
          this.cdr.markForCheck();
        }
      });
  }

  moveArrow(activePage: Page): void {
    let navigationItems = document.querySelectorAll<HTMLElement>(
      ".sw-header__navigation__item",
    );
    let slidingArrowContainer = document.querySelector<HTMLElement>(
      ".sw-header__navigation__arrow-container",
    );

    if (slidingArrowContainer) {
      //Quick solution , refactor this!
      if (activePage === "") {
        slidingArrowContainer.style.display = "flex";
        slidingArrowContainer.style.left = navigationItems[0].offsetLeft + "px";
        slidingArrowContainer.style.width = navigationItems[0].clientWidth + "px";
      } else if (activePage === "specialists") {
        slidingArrowContainer.style.display = "flex";
        slidingArrowContainer.style.left = navigationItems[1].offsetLeft + "px";
        slidingArrowContainer.style.width = navigationItems[1].clientWidth + "px";
      } else if (activePage === "blog") {
        slidingArrowContainer.style.display = "flex";
        slidingArrowContainer.style.left = navigationItems[2].offsetLeft + "px";
        slidingArrowContainer.style.width = navigationItems[2].clientWidth + "px";
      } else if (activePage === "contact") {
        slidingArrowContainer.style.display = "flex";
        slidingArrowContainer.style.left = navigationItems[3].offsetLeft + "px";
        slidingArrowContainer.style.width = navigationItems[3].clientWidth + "px";
      }
    }

    this.cdr.markForCheck();
  }

  onChangeAuthTab(authType: AuthType): void {
    this.activeAuthType = authType;

    if (authType === AuthType.REGISTRATION || authType === AuthType.RESET_PASSWORD) {
      this.showLogin = true;
    }
  }

  //Add Service Popup
  openAddServicePopup(): void {
    if (this.device === Device.MOBILE && !this.isAuth) {
      this.toggleLogin();
      return;
    }

    if (!this.isAuth) {
      this.openLoginPopup();
      return;
    }

    if (this.clientType === ClientType.CLIENT) {
      this.openSpecialistInfoPopup();
      return;
    }

    let config: OverlayConfig;

    if (this.device === Device.DESKTOP) {
      config = new OverlayConfig({
        hasBackdrop: true,
        positionStrategy: this.overlay
          .position()
          .global()
          .centerHorizontally()
          .centerVertically(),
      });
    } else {
      config = new OverlayConfig({
        hasBackdrop: true,
        panelClass: "sw-full",
        positionStrategy: this.overlay
          .position()
          .global()
          .centerHorizontally()
          .centerVertically(),
      });
    }

    let addServicePopupPortal: Portal<any> = new TemplatePortal(
      this.addServiceTemplatePortalContent,
      this.viewContainerRef,
    );

    this.addServiceOverlayRef = this.overlay.create(config);
    this.addServiceOverlayRef.attach(addServicePopupPortal);

    this.addServiceOverlayRef
      .backdropClick()
      .subscribe(() => this.addServiceOverlayRef.detach());
  }

  closeAddServicePopup() {
    this.addServiceOverlayRef.dispose();
  }

  openAndShowCategories(event: any): void {
    this.showCategoriesModal = true;
    this.selectedCategory = event?.childrens;
  }

  closeCategoriesModal(): void {
    this.showCategoriesModal = false;
  }

  //Login Popup
  openLoginPopup() {
    let loginPopupPortal: Portal<any> = new TemplatePortal(
      this.loginTemplatePortalContent,
      this.viewContainerRef,
    );

    let config: OverlayConfig;

    if (this.device === Device.DESKTOP) {
      config = new OverlayConfig({
        hasBackdrop: true,
        positionStrategy: this.overlay
          .position()
          .global()
          .centerHorizontally()
          .centerVertically(),
      });
    } else {
      config = new OverlayConfig({
        hasBackdrop: true,
        panelClass: "sw-full",
        positionStrategy: this.overlay
          .position()
          .global()
          .centerHorizontally()
          .centerVertically(),
      });
    }

    this.loginPopupOverlayRef = this.overlay.create(config);
    this.loginPopupOverlayRef.attach(loginPopupPortal);

    this.loginPopupOverlayRef
      .backdropClick()
      .subscribe(() => this.loginPopupOverlayRef.detach());
  }

  closeLoginPopup() {
    this.loginPopupOverlayRef.dispose();
  }

  //Specialist Info Popup
  openSpecialistInfoPopup(): void {
    let specialistInfoPopupPortal: Portal<any> = new TemplatePortal(
      this.specialistInfoTemplatePortalContent,
      this.viewContainerRef,
    );

    let config = new OverlayConfig({
      hasBackdrop: true,
      positionStrategy: this.overlay
        .position()
        .global()
        .centerHorizontally()
        .centerVertically(),
    });

    this.specialistInfoPopupOverlayRef = this.overlay.create(config);
    this.specialistInfoPopupOverlayRef.attach(specialistInfoPopupPortal);

    this.specialistInfoPopupOverlayRef
      .backdropClick()
      .subscribe(() => this.specialistInfoPopupOverlayRef.detach());
  }

  closeSpecialistInfoPopup(): void {
    this.specialistInfoPopupOverlayRef.dispose();
  }

  navigateTo(url: string): void {
    this.router.navigate([url]);
  }

  logout(): void {
    console.log("where");
    this.authService.logout();
    this.store.dispatch(logoutUser());
    this.showProfile = false;
  }

  getSlidesPerView(): any {
    const windowWidth = window.innerWidth;

    if (windowWidth >= 1720) {
      return "6";
    } else if (windowWidth >= 1420) {
      return "5";
    } else if (windowWidth >= 1200) {
      return "4";
    } else {
      return "auto";
    }
  }

  toggleLogin(): void {
    this.showLogin = !this.showLogin;
    this.showProfile = false;
    this.showCategories = false;
    if (this.activeAuthType === AuthType.ADD_MOBILE) {
      this.logout();
    }
    this.activeAuthType = AuthType.LOGIN;
  }

  onChangeAndClose(): void {
    this.showLogin = !this.showLogin;
    this.activeAuthType = AuthType.LOGIN;
    this.showCategories = false;
    this.showProfile = false;
    this.cdr.detectChanges();
  }

  becomeSpecialist(): void {
    this.activeAuthType = AuthType.SPECIALIST_INFO;
    this.showLogin = !this.showLogin;
  }

  addMobile(): void {
    this.activeAuthType = AuthType.ADD_MOBILE;
    this.showLogin = true;
    this.cdr.detectChanges();
  }
  /**
   *
   */
  toggleCategories(): void {
    this.showCategories = !this.showCategories;
    this.showLogin = false;
    this.showProfile = false;
  }

  toggleProfile(): void {
    this.showProfile = !this.showProfile;
    this.showLogin = false;
    this.showCategories = false;
  }

  trackBy(index: number, _item: any) {
    return index;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }
}
