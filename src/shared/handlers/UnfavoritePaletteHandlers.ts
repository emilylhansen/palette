import { handle } from "redux-pack";
import { SharedState } from "src/shared/shared.types";
import { UnfavoritePalette } from "src/shared/shared.actions";
import {
  pending,
  failure,
  success,
  initial,
  fold,
  RemoteData,
} from "@devexperts/remote-data-ts";
import { Lens } from "monocle-ts";

export const UnfavoritePaletteHandlers = ({
  state,
  action,
}: {
  state: SharedState;
  action: UnfavoritePalette;
}) => {
  return handle(state, action, {
    // start: (prevState, newAction) => {
    //   return {
    //     ...prevState,
    //     favoritePaletteIds: pending,
    //   };
    // },
    // failure: (prevState, newAction) => {
    //   return {
    //     ...prevState,
    //     favoritePaletteIds: failure("could not unfavorite palette"),
    //   };
    // },
    success: (prevState, newAction) => {
      const favoritePaletteIds = fold<
        string,
        Array<string>,
        RemoteData<string, Array<string>>
      >(
        () => initial,
        () => pending,
        () => failure("could not unfavorite palette"),
        favoritePaletteIds_ =>
          success(favoritePaletteIds_.filter(i => i !== newAction.payload.key))
      )(prevState.favoritePaletteIds);

      return {
        ...prevState,
        favoritePaletteIds,
      };
    },
  });
};
