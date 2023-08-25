
import { User } from '@models/index';
import { createAction, props } from '@ngrx/store';


/**
 * Fetch User
 */
export const fetchUser = createAction(
    '[User] Fetch user'
)

export const fetchUserSuccess = createAction(
    '[User] Fetch User Success',
    props<{ user: User }>()
)

export const fetchUserFailure = createAction(
    '[User] Fetch User Failure',
    props<{ err: any }>()
)

/**
 * Fetch User
 */
export const logoutUser = createAction(
    '[User] Logout User'
)



