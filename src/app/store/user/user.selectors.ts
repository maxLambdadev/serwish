import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.reducer';

export const selectUserState = createFeatureSelector<UserState>('user');

export const selectUser = createSelector(
    selectUserState,
    (state: UserState) => {
        return state.user;
    }
);
export const selectUserName = createSelector(
    selectUserState,
    (state: UserState) => {
        return state.user.name;
    }
);

export const selectIsAuth = createSelector(
    selectUserState,
    (state: UserState) => {
        return state.isAuth;
    }
);

export const selectUserPhoneNumber = createSelector(
    selectUserState,
    (state: UserState) => {
        return state.user.phone_number;
    }
);



