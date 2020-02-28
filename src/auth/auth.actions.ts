import { ThunkDispatch as Dispatch } from "redux-thunk";
import { AUTHENTICATE, UNAUTHENTICATE } from "src/auth/auth.constants";
import { AuthState } from "src/auth/auth.types";
import { Action } from "redux";

export type Authenticate = {
  type: AUTHENTICATE;
  payload: { key: string };
};
export const authenticate = ({ key }: { key: string }): Authenticate => {
  return {
    type: AUTHENTICATE,
    payload: { key },
  };
};

export type Unauthenticate = {
  type: UNAUTHENTICATE;
};
export const unauthenticate = (): Unauthenticate => {
  return {
    type: UNAUTHENTICATE,
  };
};

export enum AuthActionType {
  Authenticate = "AUTHENTICATE",
  Unauthenticate = "UNAUTHENTICATE",
}

export type AuthAction = Authenticate | Unauthenticate;
