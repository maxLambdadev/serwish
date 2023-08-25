import { createFeatureSelector, createSelector } from "@ngrx/store";
import { FiltersState } from './filters.reducer';

export const selectFiltersState = createFeatureSelector<FiltersState>('filters');

export const selectSelectedCategories = createSelector(
    selectFiltersState,
    (state: FiltersState) => {
        return state.selectedCategories;
    }
);

export const selectSelectedCities = createSelector(
    selectFiltersState,
    (state: FiltersState) => {
        return state.selectedCities;
    }
);