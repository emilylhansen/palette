import { Action } from "redux";
import { initialState, AuthReducerState } from "src/auth/auth.types";
import { AuthAction, AuthActionType } from "src/auth/auth.actions";
import { Option, none, some } from "fp-ts/lib/Option";
import { mockCurrentUser } from "src/shared/mockData";

export const authReducer = (
  state = initialState,
  action: AuthAction
): AuthReducerState => {
  switch (action.type) {
    case AuthActionType.Authenticate:
      const { key } = action.payload;

      return { ...state, currentUser: some(mockCurrentUser) };
    case AuthActionType.Unauthenticate:
      return { ...state, currentUser: none };
    default:
      return state;
  }
};
