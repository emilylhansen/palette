import { ThunkDispatch as Dispatch } from "redux-thunk";
import {
  AUTHENTICATE,
  UNAUTHENTICATE,
} from "/Users/emilyhansen/Desktop/palette-app/src/auth/auth.constants";
import { AuthReducerState } from "/Users/emilyhansen/Desktop/palette-app/src/auth/auth.types";
import { Action } from "redux";

export type Authenticate = {
  type: AUTHENTICATE;
};
export const authenticate = (): Authenticate => {
  return {
    type: AUTHENTICATE,
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
