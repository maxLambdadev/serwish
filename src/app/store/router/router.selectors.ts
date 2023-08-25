import {
    createSelector,
    createFeatureSelector,
    ActionReducerMap,
} from '@ngrx/store';

import * as fromRouter from './router.reducer';

export interface State {
    routerReducer: fromRouter.SWRouterState;
}

export const swRouterReducer: ActionReducerMap<State> = {
    routerReducer: <any>fromRouter.rreducer,
};

export const getRouter = createFeatureSelector<fromRouter.SWRouterState>(
    'routerReducer'
);
export const getActiveRoutes = createSelector(
    getRouter,
    fromRouter.getActiveRoute
);
export const getPrevState = createSelector(getRouter, fromRouter.getPrevRoute);
