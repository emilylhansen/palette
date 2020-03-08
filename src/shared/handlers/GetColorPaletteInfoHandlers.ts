import { handle } from "redux-pack";
import { SharedState } from "src/shared/shared.types";
import { GetColorPaletteInfo } from "src/shared/shared.actions";
import { pending, failure, success } from "@devexperts/remote-data-ts";
import { Lens } from "monocle-ts";

export const GetObjectColorsHandlers = ({
  state,
  action,
}: {
  state: SharedState;
  action: GetColorPaletteInfo;
}) => {
  return handle(state, action, {
    start: (prevState, newAction) => {},
    failure: (prevState, newAction) => {},
    success: (prevState, newAction) => {
      const colors = newAction.payload.data.colors;
      const objectsById = Lens.fromProp<SharedState["colorsById"]>()(
        object.id
      ).set(success(object))(state.objectsById);

      return {
        ...prevState,
        objectsById,
      };
    },
  });
};
