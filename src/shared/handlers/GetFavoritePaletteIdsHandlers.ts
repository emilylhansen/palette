import { failure, pending, success } from "@devexperts/remote-data-ts";
import { handle } from "redux-pack";
import { mockFavoritePaletteIds } from "src/shared/mockData";
import { GetFavoritePaletteIds } from "src/shared/shared.actions";
import { SharedState } from "src/shared/shared.types";

export const GetFavoritePaletteIdsHandlers = ({
  state,
  action,
}: {
  state: SharedState;
  action: GetFavoritePaletteIds;
}) => {
  return handle(state, action, {
    start: (prevState, newAction) => {
      return {
        ...prevState,
        favoritePaletteIds: pending,
      };
    },
    failure: (prevState, newAction) => {
      return {
        ...prevState,
        favoritePaletteIds: failure("could not fetch favorite color ids"),
      };
    },
    success: (prevState, newAction) => {
      return {
        ...prevState,
        favoritePaletteIds: success(mockFavoritePaletteIds),
      };
    },
  });
};
