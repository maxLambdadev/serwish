import { createFeatureSelector, createSelector } from "@ngrx/store";
import { FavoritesState } from './favorites.reducer';

export const selectFavoritesState = createFeatureSelector<FavoritesState>('favorites');

export const selectFavorites = createSelector(
    selectFavoritesState,
    (state: FavoritesState) => {
        return state.favorites;
    }
)

export const selectIsFavorite = (id: number) => createSelector(
    selectFavoritesState,
    (state: FavoritesState) => {
        return state.favorites.findIndex((idd: number) => idd == id) > -1
    }
)

export const selectFavoritesCount = createSelector(
    selectFavoritesState,
    (state: FavoritesState) => {
        return state.favorites.length;
    }
)