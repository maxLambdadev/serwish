import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SpecialistState } from './specialist.reducer';

export const selectSpecialistState = createFeatureSelector<SpecialistState>('specialist');

export const selectSpecialists = createSelector(
  selectSpecialistState,
  (state: SpecialistState) => {
    return state.specialists;
  }
);

export const selectSpecialistsLoadingStatus = createSelector(
  selectSpecialistState,
  (state: SpecialistState) => {
    return state.specialistsLoadingStatus;
  }
);

export const selectSpecialistsPageData = createSelector(
  selectSpecialistState,
  (state: SpecialistState) => {
    return state.specialistsPageData;
  }
);

export const selectSpecialist = createSelector(
  selectSpecialistState,
  (state: SpecialistState) => {
    return state.specialist;
  }
);

export const selectSpecialistLoadingStatus = createSelector(
  selectSpecialistState,
  (state: SpecialistState) => {
    return state.specialistLoadingStatus;
  }
);

export const selectSpecialistServices = createSelector(
  selectSpecialistState,
  (state: SpecialistState) => {
    return state.specialistServices;
  }
);

export const selectSpecialistServicesLoadingStatus = createSelector(
  selectSpecialistState,
  (state: SpecialistState) => {
    return state.specialistServicesLoadingStatus;
  }
);

export const selectSpecialistServicesPageData = createSelector(
  selectSpecialistState,
  (state: SpecialistState) => {
    return state.specialistServicesPageData;
  }
);
