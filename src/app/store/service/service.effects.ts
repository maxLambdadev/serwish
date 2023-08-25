import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';

import { ServicesService, SeoService, SpecialistsService } from '@services/index';


import { of } from 'rxjs';

import {
  catchError,
  filter,
  map,
  switchMap,
  withLatestFrom
} from 'rxjs/operators';

import * as serviceActions from './service.actions';

import {
  RouterNavigatedAction,
  ROUTER_NAVIGATED
} from '@ngrx/router-store';
import { RouterStateUrl } from '../../sw-route.serilizer';
import { Service, ServiceFilterArgs, SpecialistFilterArgs, ExtPageData, PageData } from '@models/index';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectWishlistFilterArgs } from './service.selectors';
import { getActiveRoutes, selectFavorites, selectCalled, selectViewed } from '@store/index';
import { generateServiceArgs } from '@utils/utils';

const { convert } = require('html-to-text');
import * as syncActions from '../sync/sync.actions';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceEffects {

  constructor(
    private store: Store,
    private actions$: Actions,
    private servicesService: ServicesService,
    private route: ActivatedRoute,
    private seoService: SeoService,
    private specialistsService: SpecialistsService
  ) { }


  //SERVICES
  servicesPolling$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ROUTER_NAVIGATED),
      filter((action: RouterNavigatedAction<RouterStateUrl>) => {
        const url: string = action.payload.routerState.url;
        const isDetails: boolean = action.payload.routerState.url.includes("details");

        return url.startsWith('/services/') && !isDetails;
      }),
      map((action: RouterNavigatedAction<RouterStateUrl>) => {
        return action.payload.routerState.queryParams;
      }),
      switchMap(queryParams => {

        let actions = [];

        let args: ServiceFilterArgs = generateServiceArgs(queryParams) || {}

        if (args) {
          actions.push(
            serviceActions.servicesClear(),
            serviceActions.fetchServices({ serviceFilterArgs: args })
          );
        }

        return actions;
      })
    )
  );

  fetchServices$ = createEffect(() =>
    this.actions$.pipe(
      ofType(serviceActions.fetchServices),
      map(action => action),
      withLatestFrom(
        this.store.select(selectViewed),
        this.store.select(selectCalled),
        this.store.select(getActiveRoutes)
      ),
      switchMap(([action, viewed, called, currState]) => {

        let args: ServiceFilterArgs;

        if (action.pageId) {
          args = generateServiceArgs(currState.queryParams);
          args.page = action.pageId;
        } else {
          args = action.serviceFilterArgs;
        }

        return this.servicesService.getServices(args)
          .pipe(
            switchMap((servicesPage: ExtPageData) => {
              let actions = [];

              let servicesData: Array<Service> = servicesPage.list.data.map((service: Service) => {
                let serviceDraft: Service = service;

                serviceDraft.isViewed = false;
                serviceDraft.isCalled = false;

                if (viewed.includes(service.id)) {
                  serviceDraft.isViewed = true;
                }

                if (called.includes(service.id)) {
                  serviceDraft.isCalled = true;
                }

                return serviceDraft
              });

              //This mean if first/initial load
              if (!action.pageId) {

                actions.push(
                  serviceActions.fetchServicesPageData({ servicesPage: servicesPage })
                );

              }

              if (servicesPage.list.last_page >= args.page) {

                // if (servicesPage?.category) {

                  let categorieName = servicesPage.category.translated[0].meta_title;
                  let description = convert(servicesPage.category.translated[0].meta_description, { wordwrap: 130 });
                  let tagsString: string = '';

                  servicesPage.category.tags.forEach((tag: any) => {
                    tagsString = tagsString.concat(tag.translated[0].name, ",");
                  })

                  this.seoService.setDetailSeo(categorieName, description, tagsString);
                // }


                actions.push(
                  serviceActions.fetchServicesSuccess({ services: servicesData })
                );

              }

              return actions;
            }),
            catchError((err: any) =>
              of(serviceActions.fetchServicesFailure({ err: err }))
            )
          );
      })
    )
  );

  //DETAILS
  servicePolling$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ROUTER_NAVIGATED),
      filter((action: RouterNavigatedAction<RouterStateUrl>) => {
        const url: string = action.payload.routerState.url;
        return url.startsWith('/services/details');
      }),
      map((action: RouterNavigatedAction<RouterStateUrl>) => {
        return action.payload.routerState.params.id;
      }),
      withLatestFrom(this.route.queryParams),
      switchMap(([id, queryParams]) => {

        let actions = [];

        const specialistFilterArgs: SpecialistFilterArgs = {
          locale: queryParams.locale || 'ka',
          page: 1,
          perPage: 16,
        };

        //Fetch Service Details
        //Fetch Similar Specialists
        actions.push(
          serviceActions.fetchService({ id, locale: queryParams.locale || 'ka' }),
          serviceActions.fetchSimilarSpecialists({ specialistFilterArgs: specialistFilterArgs })
        );

        return actions;
      })
    )
  );

  fetchService$ = createEffect(() =>
    this.actions$.pipe(
      ofType(serviceActions.fetchService),
      map(action => action),
      withLatestFrom(
        this.store.select(selectViewed),
        this.store.select(selectCalled)
      ),
      switchMap(([action, viewed, called]) => {
        return this.servicesService.getService(action.id, action.locale)
          .pipe(
            switchMap((service: Service) => {

              //SEO Stuff Start
              let tagsString: string;

              if (service.tags.length > 0) {
                tagsString = service.tags
                  .map((elem: any) => {
                    return elem.translated[0].name
                  }).join(", ");
              }

              let description = convert(service?.translated?.description, { wordwrap: 130 });
              let shareImage: string;
              if (service?.images[0]) {
                shareImage = environment.apiUrl + "/storage/" + service?.images[0].path;
              }

              this.seoService.setDetailSeo(service?.translated?.title, description, tagsString, service?.specialist?.name, shareImage);
              //SEO Stuff End

              //Add viewed or called status
              let serviceDraft: Service = service;

              serviceDraft.isViewed = false;
              serviceDraft.isCalled = false;

              if (viewed.includes(service.id)) {
                serviceDraft.isViewed = true;
              }

              if (called.includes(service.id)) {
                serviceDraft.isCalled = true;
              }

              let actions = [];

              const serviceFilterArgs: ServiceFilterArgs = {
                locale: action.locale || 'ka',
                page: 1,
                perPage: 12,
                categories: service.categories[0].id
              };

              actions.push(
                serviceActions.fetchServiceSuccess({ service: serviceDraft }),
                serviceActions.fetchSimilarServices({ serviceFilterArgs: serviceFilterArgs })
              );

              return actions;
            }),
            catchError((err: any) =>
              of(serviceActions.fetchServiceFailure({ err: err }))
            )
          );
      })
    )
  );

  //WISHLIST
  wishlistServicesPolling$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ROUTER_NAVIGATED),
      filter((action: RouterNavigatedAction<RouterStateUrl>) => {
        const url: string = action.payload.routerState.url;
        return url == '/wishlist' || url.startsWith('/wishlist?');
      }),
      map((action: RouterNavigatedAction<RouterStateUrl>) => {
        return action.payload.routerState.queryParams;
      }),
      withLatestFrom(this.store.select(selectFavorites)),
      map(([queryParams, favorites]) => {

        const args: ServiceFilterArgs = {
          ids: favorites,
          locale: queryParams.locale || 'ka',
          page: queryParams.page || 1,
          perPage: queryParams.perPage || 100,
        };

        if (favorites.length > 0) {
          return serviceActions.fetchWishlistServices({ wishlistFilterArgs: args });
        } else {
          return serviceActions.fetchWishlistServicesSuccess({ services: [] });
        }

      })
    )
  );

  fetchWishlistServices$ = createEffect(() =>
    this.actions$.pipe(
      ofType(serviceActions.fetchWishlistServices),
      map(action => action.wishlistFilterArgs),
      withLatestFrom(
        this.store.select(selectViewed),
        this.store.select(selectCalled)
      ),
      switchMap(([args, viewed, called]) => {
        return this.servicesService.getServices(args)
          .pipe(
            map((wishlistPage: ExtPageData) => {

              let servicesData: Array<Service> = wishlistPage.list.data.map((service: Service) => {

                let serviceDraft: Service = service;

                serviceDraft.isViewed = false;
                serviceDraft.isCalled = false;

                if (viewed.includes(service.id)) {
                  serviceDraft.isViewed = true;
                }

                if (called.includes(service.id)) {
                  serviceDraft.isCalled = true;
                }

                return serviceDraft
              });

              return serviceActions.fetchWishlistServicesSuccess({ services: servicesData });
            }),
            catchError((err: any) =>
              of(serviceActions.fetchWishlistServicesFailure({ err: err }))
            )
          );
      })
    )
  );

  updateWishlistServices$ = createEffect(() =>
    this.actions$.pipe(
      ofType(serviceActions.updateWishlistServices),
      map(action => action),
      withLatestFrom(this.store.select(selectWishlistFilterArgs)),
      switchMap(([_action, args]) => {
        return this.servicesService.getServices(args).pipe(
          map((wishlistPage: ExtPageData) => {
            return serviceActions.fetchWishlistServicesSuccess({ services: wishlistPage.list.data });
          }),
          catchError((err: any) =>
            of(serviceActions.fetchWishlistServicesFailure({ err: err }))
          )
        );
      })
    )
  );

  //SIMILAR
  fetchSimilarServices$ = createEffect(() =>
    this.actions$.pipe(
      ofType(serviceActions.fetchSimilarServices),
      map(action => action),
      withLatestFrom(
        this.store.select(selectViewed),
        this.store.select(selectCalled)
      ),
      switchMap(([action, viewed, called]) => {

        let args: ServiceFilterArgs = action.serviceFilterArgs;

        return this.servicesService.getServices(args).pipe(
          map((similarPage: ExtPageData) => {

            let servicesData: Array<Service> = similarPage.list.data.map((service: Service) => {
              let serviceDraft: Service = service;

              if (called.includes(service.id)) {
                serviceDraft.isCalled = true;
              }

              if (viewed.includes(service.id)) {
                serviceDraft.isViewed = true;
              }

              return serviceDraft
            });

            return serviceActions.fetchSimilarServicesSuccess({ similarServices: servicesData });
          }),
          catchError((err: any) =>
            of(serviceActions.fetchSimilarServicesFailure({ err: err }))
          )
        );
      })
    )
  );

  fetchSimilarSpecialists$ = createEffect(() => this.actions$.pipe(
    ofType(serviceActions.fetchSimilarSpecialists),
    map(action => action),
    switchMap((action) => {
      return this.specialistsService.getSpecialists(action.specialistFilterArgs)
        .pipe(
          map((specialistsPage: PageData) => {
            return serviceActions.fetchSimilarSpecialistsSuccess({ specialists: specialistsPage.data });
          }),
          catchError((err: any) =>
            of(serviceActions.fetchSimilarSpecialistsFailure({ err: err }))
          )
        );
    })
  ))

  //VIEWED
  viewedServicesPolling$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ROUTER_NAVIGATED),
      filter((action: RouterNavigatedAction<RouterStateUrl>) => {
        const url: string = action.payload.routerState.url;
        return url.startsWith('/services/');
      }),
      map((action: RouterNavigatedAction<RouterStateUrl>) => {
        return action.payload.routerState;
      }),
      withLatestFrom(this.store.select(selectViewed)),
      switchMap(([routerState, viewed]) => {

        let actions = [];

        const args: ServiceFilterArgs = {
          ids: viewed,
          locale: routerState.queryParams.locale || 'ka',
          page: 1,
          perPage: 100,
          noSort: 0
        };

        actions.push(syncActions.toggleViewedService({ id: parseInt(routerState.params.id) }))

        if (viewed.length > 0) {
          actions.push(serviceActions.fetchViewedServices({ serviceFilterArgs: args }));
        } else {
          actions.push(serviceActions.fetchViewedServicesFailure({ err: {} }));
        }

        return actions;

      })
    )
  );

  fetchViewedServices$ = createEffect(() =>
    this.actions$.pipe(
      ofType(serviceActions.fetchViewedServices),
      map(action => action.serviceFilterArgs),
      withLatestFrom(
        this.store.select(selectViewed),
        this.store.select(selectCalled)
      ),
      switchMap(([args, viewed, called]) => {
        return this.servicesService.getServices(args)
          .pipe(
            switchMap((servicesPage: ExtPageData) => {

              const servicesData: Array<Service> = servicesPage.list.data.map((service: Service) => {

                let serviceDraft: Service = service;

                serviceDraft.isViewed = false;
                serviceDraft.isCalled = false;

                if (viewed.includes(service.id)) {
                  serviceDraft.isViewed = true;
                }

                if (called.includes(service.id)) {
                  serviceDraft.isCalled = true;
                }

                return serviceDraft
              });

              let finalServicesData: Array<Service> = [];

              if (viewed) {
                finalServicesData = viewed.map((viewedId) => {
                  return servicesData.find((service: Service) => {
                    return service.id === viewedId
                  });
                });
              }

              let finalData: Array<Service> = finalServicesData.filter((item: any) => item);

              return [serviceActions.fetchViewedServicesSuccess({ viewedServices: finalData.reverse() })];
            }),
            catchError((err: any) =>
              of(serviceActions.fetchViewedServicesFailure({ err: err }))
            )
          );
      })
    )
  );

  //MY SERVICES
  fetchMyServices$ = createEffect(() =>
    this.actions$.pipe(
      ofType(serviceActions.fetchMyServices),
      map(action => action),
      switchMap((_action) => {

        let args: ServiceFilterArgs = {
          perPage: 100
        }

        return this.servicesService.getMyServices(args)
          .pipe(
            map((servicesPage: PageData) => {
              return serviceActions.fetchMyServicesSuccess({ myServices: servicesPage.data });
            }),
            catchError((err: any) =>
              of(serviceActions.fetchMyServicesFailure({ err: err }))
            )
          );
      })
    )
  );

}
