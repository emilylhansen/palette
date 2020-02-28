import { Action } from "redux";
import { initialState, AuthState } from "src/auth/auth.types";
import { AuthAction, AuthActionType } from "src/auth/auth.actions";
import { Option, none, some } from "fp-ts/lib/Option";
import { mockUsersById } from "src/shared/mockData";

export const authReducer = (
  state = initialState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case AuthActionType.Authenticate:
      const { key } = action.payload;

      return { ...state, currentUser: some(mockUsersById[0]) };
    case AuthActionType.Unauthenticate:
      return { ...state, currentUser: none };
    default:
      return state;
  }
};
