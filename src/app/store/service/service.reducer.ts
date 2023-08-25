import { Action, createReducer, on } from '@ngrx/store';
import * as serviceActions from './service.actions';

import { ClientType, Specialist, Service, ServiceFilterArgs, LoadingStatus, ExtPageData } from '@models/index';

export interface ServiceState {
  services: Array<Service>;
  servicesLoadingStatus: LoadingStatus;
  servicesPageData: ExtPageData;
  wishlistServices: Array<Service>;
  wishlistServicesLoadingStatus: LoadingStatus;
  wishlistFilterArgs: ServiceFilterArgs;
  service: Service;
  serviceLoadingStatus: LoadingStatus;
  viewedServices: Array<Service>;
  viewedServicesLoadingStatus: LoadingStatus;
  similarServices: Array<Service>;
  similarServicesLoadingStatus: LoadingStatus;
  similarSpecialists: Array<Specialist>;
  similarSpecialistsLoadingStatus: LoadingStatus;
  myServices: Array<Service>;
}

export const serviceInitState: ServiceState = {
  services: new Array<Service>(),
  servicesLoadingStatus: LoadingStatus.NOT_LOADED,
  servicesPageData: {} as ExtPageData,
  wishlistServices: new Array<Service>(),
  wishlistServicesLoadingStatus: LoadingStatus.NOT_LOADED,
  wishlistFilterArgs: {} as ServiceFilterArgs,
  service: {} as Service,
  serviceLoadingStatus: LoadingStatus.NOT_LOADED,
  viewedServices: new Array<Service>(),
  viewedServicesLoadingStatus: LoadingStatus.NOT_LOADED,
  similarServices: new Array<Service>(),
  similarServicesLoadingStatus: LoadingStatus.NOT_LOADED,
  similarSpecialists: new Array<Specialist>(),
  similarSpecialistsLoadingStatus: LoadingStatus.NOT_LOADED,
  myServices: new Array<Service>(),
};

const _serviceReducer = createReducer(
  serviceInitState,

  /**
  * fetch viewed service list actions
  */
  on(serviceActions.fetchViewedServices, (state: ServiceState, _action) => {
    return {
      ...state,
      viewedServices: [],
      viewedServicesLoadingStatus: LoadingStatus.LOADING
    };
  }),
  on(serviceActions.fetchViewedServicesSuccess, (state: ServiceState, action) => {
    return {
      ...state,
      viewedServices: [...action.viewedServices],
      viewedServicesLoadingStatus: LoadingStatus.LOADED
    };
  }),
  on(serviceActions.fetchViewedServicesFailure, (state: ServiceState, _action) => {
    return {
      ...state,
      viewedServicesLoadingStatus: LoadingStatus.EMPTY
    };
  }),

  /**
 * fetch service list actions
 */
  on(serviceActions.fetchServices, (state: ServiceState, _action) => {
    return {
      ...state,
      servicesLoadingStatus: LoadingStatus.LOADING
    };
  }),

  on(serviceActions.fetchServicesSuccess, (state: ServiceState, action) => {

    let draftServices = state.services;

    draftServices = [...draftServices, ...action.services];

    return {
      ...state,
      services: draftServices,
      servicesLoadingStatus: draftServices.length > 0 ? LoadingStatus.LOADED : LoadingStatus.EMPTY
    };
  }),
  on(serviceActions.fetchServicesFailure, (state: ServiceState, _action) => {
    return {
      ...state,
      servicesLoadingStatus: LoadingStatus.EMPTY
    };
  }),

  on(serviceActions.servicesClear, (state: ServiceState, _action) => {
    return {
      ...state,
      services: []
    };
  }),

  on(serviceActions.fetchServicesPageData, (state: ServiceState, action) => {
    return {
      ...state,
      servicesPageData: action.servicesPage
    };
  }),


  /**
   * fetch single service actions
   */
  on(serviceActions.fetchService, (state: ServiceState, _action) => {
    return {
      ...state,
      service: {} as Service,
      serviceLoadingStatus: LoadingStatus.LOADING
    };
  }),
  on(serviceActions.fetchServiceSuccess, (state: ServiceState, action) => {

    return {
      ...state,
      service: {
        ...action.service
      },
      serviceLoadingStatus: LoadingStatus.LOADED
    };
  }),
  on(serviceActions.fetchServiceFailure, (state: ServiceState, _action) => {
    return {
      ...state,
      serviceLoadingStatus: LoadingStatus.EMPTY
    };
  }),

  /**
* fetch wishlist service list actions
*/
  on(serviceActions.fetchWishlistServices, (state: ServiceState, action) => {
    return {
      ...state,
      wishlistFilterArgs: action.wishlistFilterArgs,
      wishlistServices: [],
      wishlistServicesLoadingStatus: LoadingStatus.LOADING
    };
  }),
  on(serviceActions.fetchWishlistServicesSuccess, (state: ServiceState, action) => {
    return {
      ...state,
      wishlistServices: [...action.services],
      wishlistServicesLoadingStatus: action.services.length > 0 ? LoadingStatus.LOADED : LoadingStatus.EMPTY
    };
  }),
  on(serviceActions.fetchWishlistServicesFailure, (state: ServiceState, _action) => {
    return {
      ...state,
      wishlistServicesLoadingStatus: LoadingStatus.EMPTY
    };
  }),

  /**
  * fetch similar services
  */
  on(serviceActions.fetchSimilarServices, (state: ServiceState, _action) => {
    return {
      ...state,
      similarServices: [],
      similarServicesLoadingStatus: LoadingStatus.LOADING
    };
  }),
  on(serviceActions.fetchSimilarServicesSuccess, (state: ServiceState, action) => {
    return {
      ...state,
      similarServices: [...action.similarServices],
      similarServicesLoadingStatus: action.similarServices.length > 0 ? LoadingStatus.LOADED : LoadingStatus.EMPTY
    };
  }),
  on(serviceActions.fetchSimilarServicesFailure, (state: ServiceState, _action) => {
    return {
      ...state,
      similarServicesLoadingStatus: LoadingStatus.EMPTY
    };
  }),


  /**
* fetch similar specialist actions
*/
  on(serviceActions.fetchSimilarSpecialists, (state: ServiceState, _action) => {
    return {
      ...state,
      similarSpecialists: [],
      similarSpecialistsLoadingStatus: LoadingStatus.LOADING
    };
  }),
  on(serviceActions.fetchSimilarSpecialistsSuccess, (state: ServiceState, action) => {

    let onlyEmployee: Array<Specialist>;

    if (action.specialists) {
      onlyEmployee = action.specialists.filter((specialist: Specialist) => {
        return specialist.client_type === ClientType.EMPLOYEE
      });
    } else {
      onlyEmployee = [];
    }

    return {
      ...state,
      similarSpecialists: [...onlyEmployee],
      similarSpecialistsLoadingStatus: LoadingStatus.LOADED
    };
  }),
  on(serviceActions.fetchSimilarSpecialistsFailure, (state: ServiceState, _action) => {
    return {
      ...state,
      similarSpecialistsLoadingStatus: LoadingStatus.EMPTY
    };
  }),

  /**
  * fetch service list actions
  */
  on(serviceActions.fetchMyServices, (state: ServiceState, _action) => {
    return {
      ...state,
    };
  }),

  on(serviceActions.fetchMyServicesSuccess, (state: ServiceState, action) => {

    return {
      ...state,
      myServices: action.myServices,
    };
  }),

  on(serviceActions.fetchMyServicesFailure, (state: ServiceState, _action) => {
    return {
      ...state,
    };
  }),

);

export function serviceReducer(state: ServiceState, action: Action) {
  return _serviceReducer(state, action);
}