import { Action } from "redux";
import { initialState, AuthState } from "src/auth/auth.types";
import { AuthenticateHandlers } from "src/auth/handlers/AuthenticateHandlers";
import { AuthAction, AuthActionType } from "src/auth/auth.actions";
import { Option, none, some } from "fp-ts/lib/Option";
import { mockUsersById } from "src/shared/mockData";
import { failure, pending, success } from "@devexperts/remote-data-ts";

export const authReducer = (
  state = initialState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case AuthActionType.Authenticate:
      return AuthenticateHandlers({ state, action });
    case AuthActionType.Unauthenticate:
      return { ...state, currentUser: success(none) };
    default:
      return state;
  }
};
