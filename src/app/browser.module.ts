import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { BrowserStateInterceptor } from './browser-state.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CookieModule } from 'ngx-cookie';
import { AuthInterceptor } from './auth.interceptor';

@NgModule({
  imports: [
    AppModule,
    BrowserAnimationsModule,
    CookieModule.forRoot(),
    // ServiceWorkerModule.register('ngsw-worker.js', {
    //   enabled: environment.production,
    //   // Register the ServiceWorker as soon as the app is stable
    //   // or after 30 seconds (whichever comes first).
    //   registrationStrategy: 'registerWhenStable:30000'
    // })
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: BrowserStateInterceptor,
    multi: true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },
  ],
  bootstrap: [AppComponent]
})
export class BrowserModule { }
