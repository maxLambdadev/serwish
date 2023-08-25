import {
  BrowserModule, TransferState,
} from '@angular/platform-browser';
import {
  NgModule,
  APP_INITIALIZER,
  PLATFORM_ID
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { JsonLdModule } from 'ngx-seo';
import { IconModule } from '@components/shared/icon/icon.module';
import { IconRegistry } from '@components/shared/icon/icon.registry';
import { swIconCheckIcon } from '@icons/ts';

import { FooterModule } from '@components/footer/footer.module';

//Ngrx Stuff
import { StoreModule, ActionReducerMap, ActionReducer, MetaReducer, Action } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { localStorageSync } from 'ngrx-store-localstorage';

import { sWSerializer } from './sw-route.serilizer';
import { HeaderModule } from '@components/header/header.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { traslateBrowserLoaderFactory } from './localisation/translate-browser.loader';
import { BottomNavigationModule } from '@components/bottom-navigation/bottom-navigation.module';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { fromEvent } from 'rxjs/internal/observable/fromEvent';
import { TransferHttpCacheModule } from '@nguniversal/common';

import { CookieService } from 'ngx-cookie';

import { userReducer, UserState, categoriesReducer, CategoriesState, UserEffects, TitleEffects, serviceReducer, ServiceState, ServiceEffects, RouterEffects, swRouterReducer, CategoryEffects, favoritesReducer, FavoritesState, initFavoritesState, syncReducer, SyncState, initSyncState } from '@store/index';
import { ClickService, AdsService, AppEventsService, BlogsService, CategoriesService, CitiesService, DetectPageService, DeviceService, ImageService, RecomendationService, SearchService, ServicesService, SettingsService, SmsService, SpecialistsService, TokenService } from '@services/index';


/**
 * Meta
 * Check this and refactor , make in one meta
 */
export function localStorageSyncReducer(reducer: ActionReducer<SyncState>): ActionReducer<SyncState> {
  return localStorageSync({
    keys: [
      'calledServices', 'calledSpecialists', 'viewedServices'
    ],
    rehydrate: true,
    storageKeySerializer: (key) => `state_${key}`,
  })(reducer)
}

const syncMetaReducer: Array<MetaReducer<SyncState, Action>> = [
  localStorageSyncReducer
]

export function wishlistlocalStorageSyncReducer(reducer: ActionReducer<FavoritesState>): ActionReducer<FavoritesState> {
  return localStorageSync({
    keys: ['favorites'],
    rehydrate: true,
    storageKeySerializer: (key) => `wishlist_state_${key}`,
  })(reducer)
}

const favoritesMetaReducer: Array<MetaReducer<FavoritesState, Action>> = [
  wishlistlocalStorageSyncReducer
]

export interface State {
  routerReducer: any,
  user: UserState;
  categories: CategoriesState;
  sync: SyncState;
  service: ServiceState;
}

export const reducers: ActionReducerMap<State> = {
  ...swRouterReducer,
  user: userReducer,
  categories: categoriesReducer,
  sync: syncReducer,
  service: serviceReducer
};


export function fixPageFlickering(platformId: string): () => void {
  return () => {
    if (isPlatformBrowser(platformId)) {
      const transitionStyles = Array.from(document.querySelectorAll('style[ng-transition]'));

      const serverRoot = document.body.querySelector('app-root') as HTMLElement;
      const clientRoot = serverRoot.cloneNode() as HTMLElement;

      serverRoot.setAttribute('ng-non-bindable', '');
      clientRoot.style.display = 'none';

      document.body.insertBefore(clientRoot, serverRoot);

      transitionStyles.forEach((element: any) => {
        element.removeAttribute('ng-transition');
      });

      fromEvent(window, 'load').subscribe(() => {
        transitionStyles.forEach((el: any) => el.remove());

        clientRoot.style.display = 'inline';
        serverRoot.remove();
      });
    }
  };
}



@NgModule({
  declarations: [AppComponent],
  imports: [
    JsonLdModule,
    AppRoutingModule,
    HeaderModule,
    FooterModule,
    TransferHttpCacheModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    StoreModule.forRoot(reducers),
    //Check this and refactor
    StoreModule.forFeature('sync', syncReducer, {
      initialState: initSyncState,
      metaReducers: syncMetaReducer
    }),
    StoreModule.forFeature('favorites', favoritesReducer, {
      initialState: initFavoritesState,
      metaReducers: favoritesMetaReducer
    }),
    StoreRouterConnectingModule.forRoot({
      serializer: sWSerializer
    }),
    EffectsModule.forRoot([
      RouterEffects,
      UserEffects,
      CategoryEffects,
      TitleEffects,
      ServiceEffects
    ]),
    HttpClientModule,
    IconModule,
    OverlayModule,
    PortalModule,
    BottomNavigationModule,
    TranslateModule.forRoot({
      defaultLanguage: 'ka',
      loader: {
        provide: TranslateLoader,
        useFactory: traslateBrowserLoaderFactory,
        deps: [HttpClient, TransferState],
      },
    })
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: fixPageFlickering,
      deps: [PLATFORM_ID],
      multi: true
    },
    SmsService,
    ServicesService,
    AppEventsService,
    SettingsService,
    ImageService,
    BlogsService,
    SpecialistsService,
    CategoriesService,
    CitiesService,
    TokenService,
    ClickService,
    CookieService,
    SearchService,
    DeviceService,
    AdsService,
    RecomendationService,
    DetectPageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private iconRegistry: IconRegistry) {
    this.iconRegistry.register([
      swIconCheckIcon
    ]);
  }
}
