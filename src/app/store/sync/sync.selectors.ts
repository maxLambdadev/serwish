import { createFeatureSelector, createSelector } from "@ngrx/store";
import { SyncState } from './sync.reducer';

export const selectSyncState = createFeatureSelector<SyncState>('sync');

export const selectCalled = createSelector(
    selectSyncState,
    (state: SyncState) => {
        return state.calledServices;
    }
)

export const selectIsCalled = (id: number) => createSelector(
    selectSyncState,
    (state: SyncState) => {
        return state.calledServices.findIndex((idd: number) => idd == id) > -1
    }
)


export const selectCalledSpecialists = createSelector(
    selectSyncState,
    (state: SyncState) => {
        return state.calledSpecialists;
    }
)

export const selectIsCalledSpecialists = (id: number) => createSelector(
    selectSyncState,
    (state: SyncState) => {
        return state.calledSpecialists.findIndex((idd: number) => idd == id) > -1
    }
)

export const selectViewed = createSelector(
    selectSyncState,
    (state: SyncState) => {
        return state.viewedServices;
    }
)

export const selectIsViewed = (id: number) => createSelector(
    selectSyncState,
    (state: SyncState) => {
        return state.viewedServices.findIndex((idd: number) => idd == id) > -1
    }
)