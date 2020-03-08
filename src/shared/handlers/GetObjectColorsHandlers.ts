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
    start: (prevState, newAction) => {
      const colorsByObjectId = Lens.fromProp<SharedState["colorsByObjectId"]>()(
        action.meta.id
      ).set(pending)(state.colorsByObjectId);

      return {
        ...prevState,
        colorsByObjectId,
      };
    },
    failure: (prevState, newAction) => {
      const colorsByObjectId = Lens.fromProp<SharedState["colorsByObjectId"]>()(
        action.meta.id
      ).set(failure("could not fetch object colors"))(state.colorsByObjectId);

      return {
        ...prevState,
        colorsByObjectId,
      };
    },
    success: (prevState, newAction) => {
      const data = newAction.payload.data;
      const colors = data.colors;
      const colorsByObjectId = Lens.fromProp<SharedState["colorsByObjectId"]>()(
        data.object_id
      ).set(success(colors))(state.colorsByObjectId);

      return {
        ...prevState,
        colorsByObjectId,
      };
    },
  });
};
