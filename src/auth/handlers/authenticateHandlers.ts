import { failure, pending, success } from "@devexperts/remote-data-ts";
import { handle } from "redux-pack";
import { mockFavoriteColorIds } from "src/shared/mockData";
import { Authenticate } from "src/auth/auth.actions";
import { AuthState } from "src/auth/auth.types";
import { some } from "fp-ts/lib/Option";

export const AuthenticateHandlers = ({
  state,
  action,
}: {
  state: AuthState;
  action: Authenticate;
}) => {
  return handle(state, action, {
    start: (prevState, newAction) => {
      return {
        ...prevState,
        currentUser: pending,
      };
    },
    failure: (prevState, newAction) => {
      return {
        ...prevState,
        currentUser: failure("could not fetch current user"),
      };
    },
    success: (prevState, newAction) => {
      return {
        ...prevState,
        currentUser: success(some(newAction.payload.user)),
      };
    },
  });
};
