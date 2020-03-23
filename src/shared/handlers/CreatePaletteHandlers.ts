import { handle } from "redux-pack";
import { SharedState } from "src/shared/shared.types";
import { CreatePalette } from "src/shared/shared.actions";

export const CreatePaletteHandlers = ({
  state,
  action,
}: {
  state: SharedState;
  action: CreatePalette;
}) => {
  return handle(state, action, {
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
