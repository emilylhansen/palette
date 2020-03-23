import { handle } from "redux-pack";
import { SharedState } from "src/shared/shared.types";
import { UnfavoriteColor } from "src/shared/shared.actions";
import {
  pending,
  failure,
  success,
  initial,
  fold,
  RemoteData,
} from "@devexperts/remote-data-ts";

export const UnfavoriteColorHandlers = ({
  state,
  action,
}: {
  state: SharedState;
  action: UnfavoriteColor;
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
        () => failure("could not unfavorite color"),
        favoriteColorIds_ =>
          success(favoriteColorIds_.filter(i => i !== newAction.payload.key))
      )(prevState.favoriteColorIds);

      return {
        ...prevState,
        favoriteColorIds,
      };
    },
  });
};
