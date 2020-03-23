import { exists, fold } from "@devexperts/remote-data-ts";
import { chain, isSome, none, Option, some } from "fp-ts/lib/Option";
import { pipe } from "fp-ts/lib/pipeable";
import { createSelector } from "reselect";
import { currentUserLens } from "src/auth/auth.lenses";
import { authStateLens } from "src/root/root.lenses";
import { RootState } from "src/root/root.types";
import { User } from "src/shared/shared.types";

export const getCurrentUser = (state: RootState) =>
  currentUserLens.get(authStateLens.get(state));

export const getCurrentUserId = createSelector(
  getCurrentUser,
  (currentUser): Option<string> => {
    return fold<string, Option<User>, Option<string>>(
      () => none,
      () => none,
      () => none,
      currentUser_ =>
        pipe(
          currentUser_,
          chain(c => some(c.key))
        )
    )(currentUser);
  }
);

export const isAuthenticated = createSelector(
  getCurrentUser,
  (currentUser): boolean =>
    exists<Option<User>>(currentUser_ => isSome(currentUser_))(currentUser)
);
