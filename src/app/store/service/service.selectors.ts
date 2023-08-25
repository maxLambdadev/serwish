import { Service } from '@models/service';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ServiceState } from './service.reducer';

export const selectServicesState = createFeatureSelector<ServiceState>('service');

export const selectServices = createSelector(
  selectServicesState,
  (state: ServiceState) => {
    return state.services;
  }
);

export const selectServicesLoadingStatus = createSelector(
  selectServicesState,
  (state: ServiceState) => {
    return state.servicesLoadingStatus;
  }
);


export const selectServicesPageData = createSelector(
  selectServicesState,
  (state: ServiceState) => {
    return state.servicesPageData;
  }
);

export const selectService = createSelector(
  selectServicesState,
  (state: ServiceState) => {
    return state.service;
  }
);

export const selectServiceLoadingStatus = createSelector(
  selectServicesState,
  (state: ServiceState) => {
    return state.serviceLoadingStatus;
  }
);

export const selectServiceImage = createSelector(
  selectServicesState,
  (state: ServiceState) => {
    return state.service.images;
  }
);


export const selectWishlistServices = createSelector(
  selectServicesState,
  (state: ServiceState) => {
    return state.wishlistServices;
  }
);

export const selectWishlistServicesLoadingStatus = createSelector(
  selectServicesState,
  (state: ServiceState) => {
    return state.wishlistServicesLoadingStatus;
  }
);

export const selectWishlistFilterArgs = createSelector(
  selectServicesState,
  (state: ServiceState) => {
    return state.wishlistFilterArgs;
  }
);

export const selectViewedServices = (id: number) => createSelector(
  selectServicesState,
  (state: ServiceState) => {

    let viewedServices = state.viewedServices.filter((service: Service) => {
      return service?.id !== id;
    })

    return viewedServices;
  }
);

export const selectViewedServicesLoadingStatus = createSelector(
  selectServicesState,
  (state: ServiceState) => {
    return state.viewedServicesLoadingStatus;
  }
);

export const selectSimilarServices = (id: number) => createSelector(
  selectServicesState,
  (state: ServiceState) => {

    let similarServices = state.similarServices.filter((service: Service) => {
      return service.id !== id;
    })

    return similarServices
  }
);

export const selectSimilarServicesLoadingStatus = createSelector(
  selectServicesState,
  (state: ServiceState) => {
    return state.similarServicesLoadingStatus;
  }
);


export const selectSimilarSpecialists = createSelector(
  selectServicesState,
  (state: ServiceState) => {
    return state.similarSpecialists;
  }
);

export const selectSimilarSpecialistsLoadingStatus = createSelector(
  selectServicesState,
  (state: ServiceState) => {
    return state.similarSpecialistsLoadingStatus;
  }
);

export const selectMyServices = createSelector(
  selectServicesState,
  (state: ServiceState) => {
    return state.myServices;
  }
);