import { Action } from "redux";
import {
  initialState,
  AuthReducerState,
} from "/Users/emilyhansen/Desktop/palette-app/src/auth/auth.types";
import {
  AuthAction,
  AuthActionType,
} from "/Users/emilyhansen/Desktop/palette-app/src/auth/auth.actions";
import { Option, none, some } from "fp-ts/lib/Option";

export const authReducer = (
  state = initialState,
  action: AuthAction
): AuthReducerState => {
  switch (action.type) {
    case AuthActionType.Authenticate:
      return { ...state, isAuthenticated: true, uuid: some("placeholder") };
    case AuthActionType.Unauthenticate:
      return { ...state, isAuthenticated: false, uuid: none };
    default:
      return state;
  }
};
