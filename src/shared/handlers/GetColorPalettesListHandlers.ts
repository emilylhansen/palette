import { handle } from "redux-pack";
import { SharedState } from "src/shared/shared.types";
import { GetColorPalettesList } from "src/shared/shared.actions";
import { pending, failure, success } from "@devexperts/remote-data-ts";

export const GetColorPalettesListHandlers = ({
  state,
  action,
}: {
  state: SharedState;
  action: GetColorPalettesList;
}) => {
  return handle(state, action, {
    start: (prevState, newAction) => {
      return {
        ...prevState,
        availablePalettes: pending,
      };
    },
    failure: (prevState, newAction) => {
      return {
        ...prevState,
        availablePalettes: failure("could not fetch palettes list"),
      };
    },
    success: (prevState, newAction) => {
      return {
        ...prevState,
        availablePalettes: success(newAction.payload.data.palettes),
      };
    },
  });
};
