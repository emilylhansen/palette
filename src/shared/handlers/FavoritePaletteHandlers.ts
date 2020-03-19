import { handle } from "redux-pack";
import { SharedState } from "src/shared/shared.types";
import { FavoritePalette } from "src/shared/shared.actions";
import {
  pending,
  failure,
  success,
  initial,
  fold,
  RemoteData,
} from "@devexperts/remote-data-ts";
import { Lens } from "monocle-ts";

export const FavoritePaletteHandlers = ({
  state,
  action,
}: {
  state: SharedState;
  action: FavoritePalette;
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
    //     favoritePaletteIds: failure("could not fetch favorite palettes"),
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
        () => failure("could not fetch favorite palettes"),
        favoritePaletteIds_ =>
          success([...favoritePaletteIds_, newAction.payload.key])
      )(prevState.favoritePaletteIds);

      return {
        ...prevState,
        favoritePaletteIds,
      };
    },
  });
};
