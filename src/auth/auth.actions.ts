import { ThunkDispatch as Dispatch } from "redux-thunk";
import { AUTHENTICATE, UNAUTHENTICATE } from "src/auth/auth.constants";
import { AuthState } from "src/auth/auth.types";
import { Action } from "redux";
import { User } from "src/shared/shared.types";
import { Action as ReduxPackAction } from "redux-pack";
import { makePackAction } from "src/root/root.helpers";
import { PackAction } from "src/root/root.types";

export type Authenticate = {
  type: AUTHENTICATE;
  payload: { user: User };
};

export const authenticate = ({
  user,
}: {
  user: User;
}): PackAction<Authenticate["type"], Authenticate["payload"], undefined> => {
  return makePackAction<
    Authenticate["type"],
    Authenticate["payload"],
    undefined
  >({
    type: AUTHENTICATE,
    payload: { user },
  });
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
