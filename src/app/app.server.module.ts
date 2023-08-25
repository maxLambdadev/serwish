import { Injector, NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { ServerStateInterceptor } from './server-state.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { translateServerLoaderFactory } from './localisation/translate-server.loader';
import { TransferState } from '@angular/platform-browser';
import { CookieBackendModule } from 'ngx-cookie-backend';
import { AuthInterceptor } from './auth.interceptor';


@NgModule({
  imports: [
    AppModule,
    ServerModule,
    NoopAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translateServerLoaderFactory,
        deps: [TransferState, Injector]
      }
    }),
    CookieBackendModule.forRoot()
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: ServerStateInterceptor,
    multi: true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule { }
