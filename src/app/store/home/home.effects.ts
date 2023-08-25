import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';

import { of } from 'rxjs/internal/observable/of';
import {
  catchError,
  filter,
  map,
  switchMap,
  withLatestFrom
} from 'rxjs/operators';

import * as homeActions from './home.actions';

import {
  RouterNavigatedAction,
  ROUTER_NAVIGATED
} from '@ngrx/router-store';
import { RouterStateUrl } from '../../sw-route.serilizer';
import { Store } from '@ngrx/store';
import { getActiveRoutes } from '@store/router/router.selectors';
import { Params } from '@angular/router';
import { Slider, PageData, Blog, BlogFilterArgs, SpecialistFilterArgs } from '@models/index';
import { BlogsService, SliderService, SpecialistsService } from '@services/index';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class HomeEffects {
  constructor(
    @Inject(PLATFORM_ID) private platformId: {},
    private actions$: Actions,
    private blogsService: BlogsService,
    private specialistsService: SpecialistsService,
    private sliderService: SliderService,
    private store: Store
  ) { }


  sliderPolling$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ROUTER_NAVIGATED),
      // filter(() => {
      //   return isPlatformBrowser(this.platformId)
      // }),
      filter((action: RouterNavigatedAction<RouterStateUrl>) => {
        const url: string = action.payload.routerState.url;
        return url == '/' || url.startsWith('/?');
      }),
      map((action: RouterNavigatedAction<RouterStateUrl>) => {
        return action.payload.routerState.queryParams;
      }),
      map((queryParams: Params) => {

        const locale: string = queryParams.locale || 'ka'

        return homeActions.fetchSlider({ locale: locale });
      })
    )
  );

  fetchSlider$ = createEffect(() =>
    this.actions$.pipe(
      ofType(homeActions.fetchSlider),
      map(action => action.locale),
      switchMap((locale: string) => {
        return this.sliderService.getSlider(locale)
          .pipe(
            map((slider: Array<Slider>) => {
              return homeActions.fetchSliderSuccess({ slider: slider });
            }),
            catchError((err: any) =>
              of(homeActions.fetchSliderFailure({ err: err }))
            )
          );
      })
    )
  );

  fetchHomeBlogs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(homeActions.fetchHomeBlogs),
      filter(() => {
        return isPlatformBrowser(this.platformId)
      }),
      map(action => action.filterType),
      withLatestFrom(this.store.select(getActiveRoutes)),
      switchMap(([filterType, currState]) => {

        const args: BlogFilterArgs = {
          locale: currState.queryParams?.locale || 'ka',
          page: 1,
          perPage: 4,
          filterBy: filterType
        };

        return this.blogsService.getBlogs(args)
          .pipe(
            map((blogs: Blog[]) => {
              return homeActions.fetchHomeBlogsSuccess({ blogs: blogs });
            }),
            catchError((err: any) =>
              of(homeActions.fetchHomeBlogsFailure({ err: err }))
            )
          );
      })
    )
  );

  fetchHomeSpecialists$ = createEffect(() =>
    this.actions$.pipe(
      ofType(homeActions.fetchHomeSpecialists),
      filter(() => {
        return isPlatformBrowser(this.platformId)
      }),
      map(action => action.filterType),
      withLatestFrom(this.store.select(getActiveRoutes)),
      switchMap(([filterType, currState]) => {

        const args: SpecialistFilterArgs = {
          locale: currState.queryParams?.locale || 'ka',
          page: 1,
          perPage: 10,
          has_serwish_quality: filterType === 'QUALITY' ? true : null
        };

        return this.specialistsService.getSpecialists(args).pipe(
          map((specialistsPage: PageData) => {
            return homeActions.fetchHomeSpecialistsSuccess({ specialists: specialistsPage.data });
          }),
          catchError((err: any) =>
            of(homeActions.fetchHomeSpecialistsFailure({ err: err }))
          )
        );
      })
    )
  );

}
