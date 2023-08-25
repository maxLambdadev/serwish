import { Action, createReducer, on } from "@ngrx/store";
import * as userActions from "./user.actions";
import { User } from "@models/index";

export interface UserState {
  user: User;
  isAuth: boolean;
}

export const userInitState: UserState = {
  user: {} as User,
  isAuth: false,
};

const _userReducer = createReducer(
  userInitState,

  /**
   * fetch blog list actions
   */
  on(userActions.fetchUser, (state: UserState, _action) => {
    return {
      ...state,
    };
  }),
  on(userActions.fetchUserSuccess, (state: UserState, action) => {
    return {
      ...state,
      user: action.user,
      isAuth: true,
    };
  }),
  on(userActions.fetchUserFailure, (state: UserState, _action) => {
    return {
      ...state,
      isAuth: false,
    };
  }),
  on(userActions.logoutUser, (state: UserState, _action) => {
    return {
      ...state,
      isAuth: false,
    };
  }),
);

export function userReducer(state: UserState, action: Action) {
  return _userReducer(state, action);
}
