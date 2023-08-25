import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CategoriesState } from './categories.reducer';

export const selectCategoriesState = createFeatureSelector<CategoriesState>('categories');

export const selectCategories = createSelector(
    selectCategoriesState,
    (state: CategoriesState) => {
        return state.categories;
    }
);

export const selectCategoriesLoadingsStatus = createSelector(
    selectCategoriesState,
    (state: CategoriesState) => {
        return state.loadingStatus;
    }
);