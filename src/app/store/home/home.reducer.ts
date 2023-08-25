import { Action, createReducer, on } from '@ngrx/store';
import * as homeActions from './home.actions';
import { Blog, Specialist, ClientType, LoadingStatus, Slider } from '@models/index';

export interface HomeState {
  homeBlogs: Array<Blog>;
  homeBlogsLoadingStatus: LoadingStatus;
  homeSpecialists: Array<Specialist>;
  homeSpecialistsLoadingStatus: LoadingStatus;
  slider: Array<Slider>;
}

export const homeInitState: HomeState = {
  homeBlogs: new Array<Blog>(),
  homeBlogsLoadingStatus: LoadingStatus.NOT_LOADED,
  homeSpecialists: new Array<Specialist>(),
  homeSpecialistsLoadingStatus: LoadingStatus.NOT_LOADED,
  slider: new Array<Slider>()
};

const _homeReducer = createReducer(
  homeInitState,

  /**
  * fetch slider actions
  */
  on(homeActions.fetchSlider, (state: HomeState, _action) => {
    return {
      ...state,
      slider: []
    };
  }),

  on(homeActions.fetchSliderSuccess, (state: HomeState, action) => {

    let sliderSort = [...action.slider]
    let slider: Array<Slider> = sliderSort.reverse();

    return {
      ...state,
      slider: slider
    };
  }),
  on(homeActions.fetchSliderFailure, (state: HomeState, _action) => {
    return {
      ...state
    };
  }),

  /**
  * fetch home blog list actions
  */
  on(homeActions.fetchHomeBlogs, (state: HomeState, _action) => {
    return {
      ...state,
      homeBlogs: [],
      homeBlogsLoadingStatus: LoadingStatus.LOADING
    };
  }),
  on(homeActions.fetchHomeBlogsSuccess, (state: HomeState, action) => {
    return {
      ...state,
      homeBlogs: [...action.blogs],
      homeBlogsLoadingStatus: LoadingStatus.LOADED
    };
  }),
  on(homeActions.fetchHomeBlogsFailure, (state: HomeState, _action) => {
    return {
      ...state,
      homeBlogsLoadingStatus: LoadingStatus.EMPTY
    };
  }),

  /**
  * fetch home specialist actions
  */
  on(homeActions.fetchHomeSpecialists, (state: HomeState, _action) => {
    return {
      ...state,
      homeSpecialists: [],
      homeSpecialistsLoadingStatus: LoadingStatus.LOADING
    };
  }),

  on(homeActions.fetchHomeSpecialistsSuccess, (state: HomeState, action) => {

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
      homeSpecialists: [...onlyEmployee],
      homeSpecialistsLoadingStatus: LoadingStatus.LOADED
    };
  }),

  on(homeActions.fetchHomeSpecialistsFailure, (state: HomeState, _action) => {
    return {
      ...state,
      homeSpecialistsLoadingStatus: LoadingStatus.EMPTY
    };
  }),


);

export function homeReducer(state: HomeState, action: Action) {
  return _homeReducer(state, action);
}