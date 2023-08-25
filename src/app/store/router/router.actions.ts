import { UserType } from "@models/user";
import { createAction, props } from "@ngrx/store";

export const changeLang = createAction(
    '[Router] Change Lang',
    props<{ lang: string }>()
)

export const changeQualityFIlter = createAction(
    '[Router] Change Quality Filter'
)

export const changeUserTypeFilter = createAction(
    '[Router] Change User Type',
    props<{ userType: UserType }>()
)

export const syncSelectedCategories = createAction(
    '[Router] Sync Selected Categories'
)

export const syncSelectedCities = createAction(
    '[Router] Sync Selected Cities'
)

export const removeCategories = createAction(
    '[Router] Remove Categories Filter'
)

export const removeCities = createAction(
    '[Router] Remove Cities Filter'
)