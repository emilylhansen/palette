import { AuthState } from "src/auth/auth.types";
import { currentUserLens } from "src/auth/auth.lenses";
import { createSelector } from "reselect";
import { Option, none, isNone, isSome } from "fp-ts/lib/Option";
import { RootState } from "src/root/root.types";
import { authStateLens } from "src/root/root.lenses";
import { User } from "src/shared/shared.types";
import { failure, pending, success, exists } from "@devexperts/remote-data-ts";

export const getCurrentUser = (state: RootState) =>
  currentUserLens.get(authStateLens.get(state));

export const isAuthenticated = createSelector(
  getCurrentUser,
  (currentUser): boolean =>
    exists<Option<User>>(currentUser_ => isSome(currentUser_))(currentUser)
);
