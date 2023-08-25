import { createAction, props } from "@ngrx/store";

export const toggleCalledService = createAction(
    '[Sync] toggle called service',
    props<{ id: number }>()
)

export const toggleCalledSpecialists = createAction(
    '[Sync] toggle called specialist',
    props<{ id: number }>()
)

export const toggleViewedService = createAction(
    '[Sync] toggle',
    props<{ id: number }>()
)

export const clearAllSync = createAction(
    '[Sync] clear all'
)