import { SharedAction, SharedActionType } from "src/shared/shared.actions";
import { initialState, SharedState } from "src/shared/shared.types";
import {
  mockColorsById,
  mockPalettesById,
  mockUsersById,
  mockFavoriteColorIds,
} from "src/shared/mockData";
import { GetRandomObjectHandlers } from "src/shared/handlers/GetRandomObjectHandlers";

export const sharedReducer = (
  state = initialState,
  action: SharedAction
): SharedState => {
  switch (action.type) {
    case SharedActionType.GetColors:
      return { ...state, colorsById: mockColorsById };
    case SharedActionType.GetPalettes:
      return { ...state, palettesById: mockPalettesById };
    case SharedActionType.GetUsers:
      return { ...state, usersById: mockUsersById };
    case SharedActionType.GetFavoriteColorIds:
      return { ...state, favoriteColorIds: mockFavoriteColorIds };
    case SharedActionType.GetRandomObject:
      return GetRandomObjectHandlers({ state, action });
    default:
      return state;
  }
};
