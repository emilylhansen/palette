import { handle } from "redux-pack";
import { SharedState } from "src/shared/shared.types";
import { GetColorPaletteInfo } from "src/shared/shared.actions";
import { pending, failure, success } from "@devexperts/remote-data-ts";
import { Lens } from "monocle-ts";

export const GetColorPaletteInfoHandlers = ({
  state,
  action,
}: {
  state: SharedState;
  action: GetColorPaletteInfo;
}) => {
  return handle(state, action, {
    start: (prevState, newAction) => {
      const colorsByPaletteId = Lens.fromProp<
        SharedState["colorsByPaletteId"]
      >()(newAction.meta.id).set(pending)(state.colorsByPaletteId);

      return {
        ...prevState,
        colorsByPaletteId,
      };
    },
    failure: (prevState, newAction) => {
      const colorsByPaletteId = Lens.fromProp<
        SharedState["colorsByPaletteId"]
      >()(newAction.meta.id).set(failure("could not fetch colors"))(
        state.colorsByPaletteId
      );

      return {
        ...prevState,
        colorsByPaletteId,
      };
    },
    success: (prevState, newAction) => {
      const colors = newAction.payload.data.colors;
      const colorsByPaletteId = Lens.fromProp<
        SharedState["colorsByPaletteId"]
      >()(newAction.meta.id).set(success(colors))(state.colorsByPaletteId);

      return {
        ...prevState,
        colorsByPaletteId,
      };
    },
  });
};
