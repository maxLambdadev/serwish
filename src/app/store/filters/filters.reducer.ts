import { Action, createReducer, on } from "@ngrx/store"
import cloneDeep from "lodash-es/cloneDeep";
import * as filtersActions from './filters.actions';

export interface FiltersState {
    filters: Array<number>;
    selectedCategories: Array<number>;
    selectedCities: Array<number>;
}

export const initFiltersState: FiltersState = {
    filters: new Array<number>(),
    selectedCategories: new Array<number>(),
    selectedCities: new Array<number>()
}

const _filtersReducer = createReducer(
    initFiltersState,

    on(filtersActions.toggleCategory, (state: FiltersState, action) => {
        let selectedCategories = cloneDeep(state.selectedCategories);

        const index = selectedCategories.indexOf(action.categoryId);

        if (index > -1) {
            selectedCategories.splice(index, 1);
        } else {
            selectedCategories.push(action.categoryId);
        }

        return {
            ...state,
            selectedCategories: [...selectedCategories],
        };
    }),

    on(filtersActions.toggleCity, (state: FiltersState, action) => {
        let selectedCities = cloneDeep(state.selectedCities);

        const index = selectedCities.indexOf(action.cityId);

        if (index > -1) {
            selectedCities.splice(index, 1);
        } else {
            selectedCities.push(action.cityId);
        }

        return {
            ...state,
            selectedCities: [...selectedCities],
        };
    }),

    on(filtersActions.syncSelectedCategoriesFilter, (state: FiltersState, action) => {
        return {
            ...state,
            selectedCategories: [...action.selectedCategories],
        };
    }),

    on(filtersActions.syncSelectedCitiesFilter, (state: FiltersState, action) => {
        return {
            ...state,
            selectedCities: [...action.selectedCities],
        };
    }),

    on(filtersActions.clearSelectedCategories, (state: FiltersState, _action) => {
        return {
            ...state,
            selectedCategories: []
        };
    }),

    on(filtersActions.clearSelectedCities, (state: FiltersState, _action) => {
        return {
            ...state,
            selectedCities: []
        };
    }),

)

export function filtersReducer(state: FiltersState, action: Action) {
    return _filtersReducer(state, action);
}