import { Category, LoadingStatus } from "@models/index";
import { Action, createReducer, on } from "@ngrx/store";
import * as categoriesAction from './categories.actions';

export interface CategoriesState {
    categories: Array<Category>,
    loadingStatus: LoadingStatus
}

export const categoriesInitState: CategoriesState = {
    categories: new Array<Category>(),
    loadingStatus: LoadingStatus.NOT_LOADED,
}

const _categoriesReducer = createReducer(
    categoriesInitState,
    on(categoriesAction.fetchCategories, (state: CategoriesState, _action) => {
        return {
            ...state,
            loadingStatus: LoadingStatus.NOT_LOADED
        }
    }),

    on(categoriesAction.fetchCategoriesSuccess, (state: CategoriesState, action) => {

        const mainCategories = action.categories.filter((category: Category) => {
            return category.childrens.length > 0
        })

        return {
            ...state,
            loadingStatus: LoadingStatus.LOADED,
            categories: mainCategories
        }
    }),

    on(categoriesAction.fetchCategoriesFailure, (state: CategoriesState, _action) => {
        return {
            ...state,
            loadingStatus: LoadingStatus.NOT_LOADED
        }
    }),
)

export function categoriesReducer(state: CategoriesState, action: Action) {
    return _categoriesReducer(state, action)
}