import { Action, createReducer, on } from "@ngrx/store"
import * as favoritesActions from './favorites.actions';

export interface FavoritesState {
    favorites: Array<number>
}

export const initFavoritesState: FavoritesState = {
    favorites: new Array<number>()
}

const _favoritesReducer = createReducer(
    initFavoritesState,
    on(favoritesActions.toggleFavorite, (state: FavoritesState, action) => {
        const index: number = state.favorites.findIndex((idd: number) => idd == action.id);
        let favorites = [...state.favorites];
        if (index > -1) {
            favorites.splice(index, 1);
        } else {
            if (action.id && action.id !== null) {
                favorites = [...favorites, action.id]
            }
        }
        return {
            ...state,
            favorites: favorites
        }
    })
)

export function favoritesReducer(state: FavoritesState, action: Action) {
    return _favoritesReducer(state, action);
}