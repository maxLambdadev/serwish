import { createAction, props } from "@ngrx/store";

export const toggleFavorite = createAction(
    '[Favorites] toggle',
    props<{ id: number }>()
)