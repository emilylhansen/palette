import { handle } from "redux-pack";
import { SharedState } from "src/shared/shared.types";
import { GetObjectColors } from "src/shared/shared.actions";
import { pending, failure, success } from "@devexperts/remote-data-ts";
import { Lens } from "monocle-ts";

export const GetObjectColorsHandlers = ({
  state,
  action,
}: {
  state: SharedState;
  action: GetObjectColors;
}) => {
  return handle(state, action, {
    success: (prevState, newAction) => {
      const object = newAction.payload.data.object;
      const objectsById = Lens.fromProp<SharedState["objectsById"]>()(
        object.id
      ).set(success(object))(state.objectsById);

      return {
        ...prevState,
        objectsById,
      };
    },
  });
};
