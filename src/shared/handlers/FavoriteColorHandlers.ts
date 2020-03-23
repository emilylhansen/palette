import { handle } from "redux-pack";
import { SharedState } from "src/shared/shared.types";
import { FavoriteColor } from "src/shared/shared.actions";
import {
  pending,
  failure,
  success,
  initial,
  fold,
  RemoteData,
} from "@devexperts/remote-data-ts";

export const FavoriteColorHandlers = ({
  state,
  action,
}: {
  state: SharedState;
  action: FavoriteColor;
}) => {
  return handle(state, action, {
    success: (prevState, newAction) => {
      const favoriteColorIds = fold<
        string,
        Array<string>,
        RemoteData<string, Array<string>>
      >(
        () => initial,
        () => pending,
        () => failure("could not fetch favorite colors"),
        favoriteColorIds_ =>
          success([...favoriteColorIds_, newAction.payload.key])
      )(prevState.favoriteColorIds);

      return {
        ...prevState,
        favoriteColorIds,
      };
    },
  });
};
