import { failure, pending, success } from "@devexperts/remote-data-ts";
import { handle } from "redux-pack";
import { mockFavoriteColorIds } from "src/shared/mockData";
import { GetFavoriteColorIds } from "src/shared/shared.actions";
import { SharedState } from "src/shared/shared.types";

export const GetFavoriteColorIdsHandlers = ({
  state,
  action,
}: {
  state: SharedState;
  action: GetFavoriteColorIds;
}) => {
  return handle(state, action, {
    start: (prevState, newAction) => {
      return {
        ...prevState,
        favoriteColorIds: pending,
      };
    },
    failure: (prevState, newAction) => {
      return {
        ...prevState,
        favoriteColorIds: failure("could not fetch favorite color ids"),
      };
    },
    success: (prevState, newAction) => {
      return {
        ...prevState,
        favoriteColorIds: success(mockFavoriteColorIds),
      };
    },
  });
};
