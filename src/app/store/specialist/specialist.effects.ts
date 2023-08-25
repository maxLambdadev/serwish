import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';


import { of } from 'rxjs/internal/observable/of';
import {
  catchError,
  filter,
  map,
  switchMap,
  withLatestFrom
} from 'rxjs/operators';

import * as specialistActions from './specialist.actions';

import {
  RouterNavigatedAction,
  ROUTER_NAVIGATED
} from '@ngrx/router-store';
import { RouterStateUrl } from '../../sw-route.serilizer';

import { SpecialistFilterArgs, PageData, Service, Specialist } from '@models/index';
import { ActivatedRoute } from '@angular/router';
import { SeoService, SpecialistsService } from '@services/index';
import { Store } from '@ngrx/store';
import { selectCalled, selectCalledSpecialists, selectViewed, getActiveRoutes } from '@store/index';
import { generateSpecialistsArgs } from '@utils/utils';


@Injectable({
  providedIn: 'root'
})
export class SpecialistEffects {

  constructor(
    private store: Store,
    private actions$: Actions,
    private specialistsService: SpecialistsService,
    private route: ActivatedRoute,
    private seoService: SeoService
  ) { }

  //Specialists
  specialistsPolling$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ROUTER_NAVIGATED),
      filter((action: RouterNavigatedAction<RouterStateUrl>) => {
        const url: string = action.payload.routerState.url;
        return url == '/specialists' || url.startsWith('/specialists?');
      }),
      map((action: RouterNavigatedAction<RouterStateUrl>) => {
        return action.payload.routerState.queryParams;
      }),
      switchMap(queryParams => {

        let actions = [];

        let args = generateSpecialistsArgs(queryParams);

        if (args) {
          actions.push(
            specialistActions.clearSpecialists(),
            specialistActions.fetchSpecialists({ specialistFilterArgs: args })
          );
        }

        return actions;
      })
    )
  );

  fetchSpecialists$ = createEffect(() =>
    this.actions$.pipe(
      ofType(specialistActions.fetchSpecialists),
      map(action => action),
      withLatestFrom(this.store.select(getActiveRoutes)),
      switchMap(([action, currState]) => {

        let newArgs: SpecialistFilterArgs;

        if (action.pageId) {
          newArgs = generateSpecialistsArgs(currState.queryParams);
          newArgs.page = action.pageId;
        } else {
          newArgs = action.specialistFilterArgs;
        }

        return this.specialistsService.getSpecialists(newArgs)
          .pipe(
            switchMap((specialistsPage: PageData) => {

              let actions = [];

              actions.push(
                specialistActions.fetchSpecialistsSuccess({ specialists: specialistsPage.data })
              )

              if (!action.pageId) {

                const specialistsPageData: PageData = {
                  last_page: specialistsPage.last_page,
                  total: specialistsPage.total
                }

                actions.push(
                  specialistActions.fetchSpecialistsPageDataSuccess({ specialistsPageData: specialistsPageData })
                )
              }

              return actions;
            }),
            catchError((err: any) =>
              of(specialistActions.fetchSpecialistsFailure({ err: err }))
            )
          );
      })
    )
  );


  //Single-Details Specialists
  singleSpecialistPolling$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ROUTER_NAVIGATED),
      filter((action: RouterNavigatedAction<RouterStateUrl>) => {
        const url: string = action.payload.routerState.url;
        return url.startsWith('/specialists/');
      }),
      map((action: RouterNavigatedAction<RouterStateUrl>) => {
        return action.payload.routerState.params.id;
      }),
      withLatestFrom(this.route.queryParams),
      switchMap(([id, queryParams]) => {
        let actions = [];

        const args: SpecialistFilterArgs = {
          locale: queryParams.locale || 'ka',
          page: 1,
          perPage: 16,
        };

        actions.push(
          specialistActions.fetchSpecialist({ id }),
          specialistActions.fetchSpecialistServices({ id, args })
        );

        return actions;
      })
    )
  );

  fetchSingleSpecialist$ = createEffect(() =>
    this.actions$.pipe(
      ofType(specialistActions.fetchSpecialist),
      map(action => action.id),
      withLatestFrom(this.store.select(selectCalledSpecialists)),
      switchMap(([id, called]) => {
        return this.specialistsService.getSpecialist(id)
          .pipe(
            map((specialist: Specialist) => {
              //Add Name and categories for SEO
              let shareImage = specialist.extraPic;

              this.seoService.setDetailSeo(specialist.name, specialist.categories, specialist.categories, specialist.name, shareImage);

              let specialistDraft: Specialist = specialist;

              if (called.includes(specialist.id)) {
                specialistDraft.isCalled = true;
              }

              return specialistActions.fetchSpecialistSuccess({ specialist: specialistDraft });
            }),
            catchError((err: any) =>
              of(specialistActions.fetchSpecialistFailure({ err: err }))
            )
          );
      })
    )
  );

  //Single Specialist Services
  fetchSingleSpecialistServices$ = createEffect(() =>
    this.actions$.pipe(
      ofType(specialistActions.fetchSpecialistServices),
      map(action => action),
      withLatestFrom(this.store.select(selectViewed), this.store.select(selectCalled)),
      switchMap(([action, viewed, called]) => {
        return this.specialistsService.getSpecialistServices(action.id, action.args)
          .pipe(
            switchMap((specialistServicesPageData: PageData) => {

              let actions = [];

              const servicesData: Array<Service> = specialistServicesPageData.data.map((service: Service) => {
                let serviceDraft: Service = service;

                serviceDraft.isViewed = false;
                serviceDraft.isCalled = false;

                if (viewed.includes(service.id)) {
                  serviceDraft.isViewed = true;
                }

                if (called.includes(service.id)) {
                  serviceDraft.isCalled = true;
                }

                return serviceDraft;
              });

              actions.push(
                specialistActions.fetchSpecialistsServicesPageDataSuccess({ specialistServicesPageData: specialistServicesPageData }),
                specialistActions.fetchSpecialistServicesSuccess({ services: servicesData })
              );

              return actions;
            }),
            catchError((err: any) =>
              of(specialistActions.fetchSpecialistServicesFailure({ err: err }))
            )
          );
      })
    )
  );


}
