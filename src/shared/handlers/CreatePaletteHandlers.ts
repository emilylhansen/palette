import { handle } from "redux-pack";
import { SharedState } from "src/shared/shared.types";
import { CreatePalette } from "src/shared/shared.actions";
import {
  pending,
  failure,
  success,
  initial,
  fold,
  RemoteData,
} from "@devexperts/remote-data-ts";
import { Lens } from "monocle-ts";

export const CreatePaletteHandlers = ({
  state,
  action,
}: {
  state: SharedState;
  action: CreatePalette;
}) => {
  return handle(state, action, {
    // start: (prevState, newAction) => {
    //   return {
    //     ...prevState,
    //     palettesById: pending,
    //   };
    // },
    // failure: (prevState, newAction) => {
    //   return {
    //     ...prevState,
    //     palettesById: failure("could not fetch palettes"),
    //   };
    // },
    success: (prevState, newAction) => {
      const { palette } = action.payload;

      const palettesById = {
        [palette.key]: palette,
        ...prevState.palettesById,
      };

      return {
        ...prevState,
        palettesById,
      };
    },
  });
};
