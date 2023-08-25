import { Params, RouterStateSnapshot } from '@angular/router';
import {
    RouterStateSerializer,
    RouterAction,
    ROUTER_NAVIGATED,
    ROUTER_REQUEST
} from '@ngrx/router-store';


export interface SWRouterState {
    activateRoute: RouterStateUrl;
    prevRoute: RouterStateUrl;
    navigationId: number;
}

export interface RouterStateUrl {
    url: string;
    params: Params;
    queryParams: Params;
  }
 
  export class sWSerializer implements RouterStateSerializer<RouterStateUrl> {
    serialize(routerState: RouterStateSnapshot): RouterStateUrl {
      let route = routerState.root;
   
      while (route.firstChild) {
        route = route.firstChild;
      }
   
      const {
        url,
        root: { queryParams },
      } = routerState;
      const { params } = route;
   
      // Only return an object including the URL, params and query params
      // instead of the entire snapshot
      return { url, params, queryParams };
    }
  }



export function rreducer(
    state: SWRouterState = {prevRoute: {} as RouterStateUrl, activateRoute: {} as RouterStateUrl, navigationId: -1},
    action: RouterAction<any, any>
): SWRouterState {
    switch (action.type) {
        case ROUTER_REQUEST: {
            return {
                ...state,
                prevRoute: action.payload.routerState,
                navigationId: action.payload.event.id
            };
        }
        case ROUTER_NAVIGATED: {
            return {
                ...state,
                activateRoute: action.payload.routerState,
                navigationId: action.payload.event.id
            };
        }
        default: {
            return state;
        }
    }
}

export const getRouterState = (routerState: SWRouterState) => routerState;
export const getNavigationId = (routerState: SWRouterState) =>
    routerState.navigationId;
export const getPrevRoute = (routerState: SWRouterState) =>
    routerState.prevRoute;
export const getActiveRoute = (routerState: SWRouterState) =>
    routerState.activateRoute;
