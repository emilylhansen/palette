import { Action } from "redux";
import { initialState, AuthState } from "src/auth/auth.types";
import { AuthAction, AuthActionType } from "src/auth/auth.actions";
import { Option, none, some } from "fp-ts/lib/Option";

// export const paletteCreatorReducer = (
//   state = initialState,
//   action: AuthAction
// ): AuthState => {
//   switch (action.type) {
//     // case AuthActionType.Authenticate:
//     //   return { ...state, isAuthenticated: true, uuid: some("placeholder") };
//     // case AuthActionType.Unauthenticate:
//     //   return { ...state, isAuthenticated: false, uuid: none };
//     default:
//       return state;
//   }
// };
