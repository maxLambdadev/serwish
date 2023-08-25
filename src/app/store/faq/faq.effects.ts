import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';

import { of } from 'rxjs/internal/observable/of';
import {
  catchError,
  filter,
  map,
  switchMap
} from 'rxjs/operators';

import * as faqActions from './faq.actions';

import {
  RouterNavigatedAction,
  ROUTER_NAVIGATED
} from '@ngrx/router-store';
import { RouterStateUrl } from '../../sw-route.serilizer';
import { FaqService } from '@services/faqService.service';
import { Params } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class FaqEffects {

  constructor(
    @Inject(PLATFORM_ID) private platformId: {},
    private actions$: Actions,
    private faqService: FaqService
  ) { }

  faqPolling$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ROUTER_NAVIGATED),
      filter(() => {
        return isPlatformBrowser(this.platformId)
      }),
      filter((action: RouterNavigatedAction<RouterStateUrl>) => {
        const url: string = action.payload.routerState.url;
        return url == '/' || url.startsWith('/?');
      }),
      map((action: RouterNavigatedAction<RouterStateUrl>) => {
        return action.payload.routerState.queryParams;
      }),
      switchMap((queryParams: Params) => {
        const locale: string = queryParams.locale || 'ka';
        return of(faqActions.fetchFaq({ locale: locale }));
      })
    )
  );

  fetchFaq$ = createEffect(() =>
    this.actions$.pipe(
      ofType(faqActions.fetchFaq),
      map(action => action.locale),
      switchMap((locale: string) => {
        return this.faqService.getFaq(locale)
          .pipe(
            map((faq: Array<any>) => {
              return faqActions.fetchFaqSuccess({ faq: faq });
            }),
            catchError((err: any) =>
              of(faqActions.fetchFaqFailure({ err: err }))
            )
          );
      })
    )
  );


}
