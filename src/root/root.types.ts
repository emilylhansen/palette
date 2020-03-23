import {
  initialState as authInitialState,
  AuthState,
} from "src/auth/auth.types";
import {
  initialState as sharedInitialState,
  SharedState,
} from "src/shared/shared.types";

export type RootState = {
  auth: AuthState;
  shared: SharedState;
};

export const initialState: RootState = {
  auth: authInitialState,
  shared: sharedInitialState,
};

export type ValueOf<T> = T[keyof T];

export type PackAction<T, P, M> = {
  type: T;
  promise: Promise<P>;
  payload: P;
  meta?: M;
};
