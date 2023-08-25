import { Action, createReducer, on } from '@ngrx/store';
import * as specialistActions from './specialist.actions';
import { PageData, ClientType, Service, LoadingStatus, Specialist } from '@models/index';

export interface SpecialistState {
  specialists: Array<Specialist>;
  specialistsLoadingStatus: LoadingStatus;
  specialistsPageData: PageData;
  specialist: Specialist;
  specialistLoadingStatus: LoadingStatus;
  specialistServices: Array<Service>;
  specialistServicesLoadingStatus: LoadingStatus;
  specialistServicesPageData: PageData;
}

export const specialistInitState: SpecialistState = {
  specialists: new Array<Specialist>(),
  specialistsLoadingStatus: LoadingStatus.NOT_LOADED,
  specialistsPageData: {} as PageData,
  specialist: {} as Specialist,
  specialistLoadingStatus: LoadingStatus.NOT_LOADED,
  specialistServices: new Array<Service>(),
  specialistServicesLoadingStatus: LoadingStatus.NOT_LOADED,
  specialistServicesPageData: {} as PageData,
};

const _specialistReducer = createReducer(
  specialistInitState,

  /**
  * fetch specialist page actions
  */
  on(specialistActions.fetchSpecialists, (state: SpecialistState, _action) => {
    return {
      ...state,
      // specialists: [],
      specialistsLoadingStatus: LoadingStatus.LOADING
    };
  }),
  on(specialistActions.fetchSpecialistsSuccess, (state: SpecialistState, action) => {

    let onlyEmployee: Array<Specialist>;

    if (action.specialists) {
      onlyEmployee = action.specialists.filter((specialist: Specialist) => {
        return specialist.client_type === ClientType.EMPLOYEE
      });
    } else {
      onlyEmployee = [];
    }

    let specialistsDraft = [...state.specialists, ...onlyEmployee];

    return {
      ...state,
      specialists: specialistsDraft,
      specialistsLoadingStatus: specialistsDraft.length > 0 ? LoadingStatus.LOADED : LoadingStatus.EMPTY
    };
  }),

  on(specialistActions.fetchSpecialistsFailure, (state: SpecialistState, _action) => {
    return {
      ...state,
      specialistsLoadingStatus: LoadingStatus.EMPTY
    };
  }),

  on(specialistActions.fetchSpecialistsPageDataSuccess, (state: SpecialistState, action) => {
    return {
      ...state,
      specialistsPageData: action.specialistsPageData
    };
  }),

  on(specialistActions.clearSpecialists, (state: SpecialistState, _action) => {
    return {
      ...state,
      specialists: []
    };
  }),

  on(specialistActions.fetchSpecialistsServicesPageDataSuccess, (state: SpecialistState, action) => {
    return {
      ...state,
      specialistServicesPageData: action.specialistServicesPageData
    };
  }),




  /**
  * fetch single specialist
  */
  on(specialistActions.fetchSpecialist, (state: SpecialistState, _action) => {
    return {
      ...state,
      specialist: {} as Specialist,
      specialistLoadingStatus: LoadingStatus.LOADING
    };
  }),
  on(specialistActions.fetchSpecialistSuccess, (state: SpecialistState, action) => {
    return {
      ...state,
      specialist: action.specialist,
      specialistLoadingStatus: LoadingStatus.LOADED
    };
  }),
  on(specialistActions.fetchSpecialistFailure, (state: SpecialistState, _action) => {
    return {
      ...state,
      specialistLoadingStatus: LoadingStatus.EMPTY
    };
  }),

  /**
  * fetch single specialist services
  */
  on(specialistActions.fetchSpecialistServices, (state: SpecialistState, _action) => {
    return {
      ...state,
      specialistServicesLoadingStatus: LoadingStatus.LOADING
    };
  }),
  on(specialistActions.fetchSpecialistServicesSuccess, (state: SpecialistState, action) => {

    let draftSpecialistServices = [...state.specialistServices, ...action.services];

    return {
      ...state,
      specialistServices: draftSpecialistServices,
      specialistServicesLoadingStatus: draftSpecialistServices.length > 0 ? LoadingStatus.LOADED : LoadingStatus.EMPTY,
    };
  }),
  on(specialistActions.fetchSpecialistServicesFailure, (state: SpecialistState, _action) => {
    return {
      ...state,
      specialistServicesLoadingStatus: LoadingStatus.EMPTY
    };
  }),
  on(specialistActions.clearSpecialistServices, (state: SpecialistState, _action) => {
    return {
      ...state,
      specialistServices: []
    };
  })


);

export function specialistReducer(state: SpecialistState, action: Action) {
  return _specialistReducer(state, action);
}