import { AuthState } from "src/auth/auth.types";
import { createSelector } from "reselect";
import { Option, none, isNone, isSome } from "fp-ts/lib/Option";
import { RootState } from "src/root/root.types";

export const getCurrentUser = (state: RootState) => state.auth.currentUser;

export const isAuthenticated = createSelector(getCurrentUser, currentUser =>
  isSome(currentUser)
);
