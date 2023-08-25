
import { CategoriesFilterArgs, Category } from '@models/index';
import { createAction, props } from '@ngrx/store';

/**
 * Fetch Home Blogs
 */
export const fetchCategories = createAction(
    '[Categories] Fetch Categories',
    props<{ categoriesFilterArgs?: CategoriesFilterArgs }>()
)

export const fetchCategoriesSuccess = createAction(
    '[Categories] Fetch Categories Success',
    props<{ categories: Array<Category> }>()
)

export const fetchCategoriesFailure = createAction(
    '[Categories] Fetch Categories Failure',
    props<{ err: any }>()
)


