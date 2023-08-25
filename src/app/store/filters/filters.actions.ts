import { createAction, props } from "@ngrx/store";

export const toggleCategory = createAction(
    '[Filter] Toggle Specialists Category Filter',
    props<{ categoryId: number }>()
)

export const toggleCity = createAction(
    '[Filter] Toggle City Filter',
    props<{ cityId: number }>()
)

export const syncSelectedCategoriesFilter = createAction(
    '[Filter] Sync Selected Categories',
    props<{ selectedCategories: Array<number> }>()
)

export const syncSelectedCitiesFilter = createAction(
    '[Filter] Sync Selected Cities',
    props<{ selectedCities: Array<number> }>()
)

export const clearSelectedCategories = createAction(
    '[Filter] Clear Selected Categories'
)

export const clearSelectedCities = createAction(
    '[Filter] Clear Selected Cities'
)