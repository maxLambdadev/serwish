import { Action, createReducer, on } from "@ngrx/store"
import * as syncActions from './sync.actions';

export interface SyncState {
    calledServices: Array<number>;
    calledSpecialists: Array<number>;
    viewedServices: Array<number>;
}

export const initSyncState: SyncState = {
    calledServices: new Array<number>(),
    calledSpecialists: new Array<number>(),
    viewedServices: new Array<number>()
}

const _syncReducer = createReducer(
    initSyncState,
    on(syncActions.toggleCalledService, (state: SyncState, action) => {
        const index: number = state.calledServices.findIndex((idd: number) => idd == action.id);
        let calledServices = [...state.calledServices];

        if (index <= -1) {
            if (action.id && action.id !== null) {
                calledServices = [...calledServices, action.id]
            }
        }

        return {
            ...state,
            calledServices: calledServices
        }
    }),

    on(syncActions.toggleCalledSpecialists, (state: SyncState, action) => {
        const index: number = state.calledSpecialists.findIndex((idd: number) => idd == action.id);
        let calledSpecialists = [...state.calledSpecialists];

        if (index <= -1) {
            if (action.id && action.id !== null) {
                calledSpecialists = [...calledSpecialists, action.id]
            }
        }

        return {
            ...state,
            calledSpecialists: calledSpecialists
        }
    }),

    on(syncActions.toggleViewedService, (state: SyncState, action) => {

        const index: number = state.viewedServices.findIndex((idd: number) => idd == action.id);

        let draftViewedServices: Array<number> = [...state.viewedServices];

        if (index <= -1) {

            //Add if not exists
            if (action.id && action.id !== null) {
                draftViewedServices = [...draftViewedServices, action.id];
            }

        } else {

            //Remove if exists and re-add
            let withOut = draftViewedServices.filter((serviceId: number) => {
                return serviceId !== action.id
            });

            draftViewedServices = [...withOut, action.id];
        }

        return {
            ...state,
            viewedServices: draftViewedServices
        }
    }),

    on(syncActions.clearAllSync, (state: SyncState, _action) => {

        return {
            ...state,
            calledServices: [],
            calledSpecialists: [],
            viewedServices: []
        }
    })
)

export function syncReducer(state: SyncState, action: Action) {
    return _syncReducer(state, action);
}