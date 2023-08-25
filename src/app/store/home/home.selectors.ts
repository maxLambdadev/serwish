import { createFeatureSelector, createSelector } from '@ngrx/store';
import { HomeState } from './home.reducer';

export const selectHomeState = createFeatureSelector<HomeState>('home');

export const selectSlider = createSelector(
  selectHomeState,
  (state: HomeState) => {
    return state.slider;
  }
);

export const selectHomeBlogs = createSelector(
  selectHomeState,
  (state: HomeState) => {
    return state.homeBlogs;
  }
);

export const selectHomeBlogsLoadingStatus = createSelector(
  selectHomeState,
  (state: HomeState) => {
    return state.homeBlogsLoadingStatus;
  }
);

export const selectHomeSpecialists = createSelector(
  selectHomeState,
  (state: HomeState) => {
    return state.homeSpecialists;
  }
);

export const selectHomeSpecialistsLoadingStatus = createSelector(
  selectHomeState,
  (state: HomeState) => {
    return state.homeSpecialistsLoadingStatus;
  }
);