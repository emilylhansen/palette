import { RootAction, RootActionType } from "src/shared/shared.actions";
import { initialState, SharedState } from "src/shared/shared.types";
import {
  mockColorsById,
  mockPalettesById,
  mockUsersById,
  mockFavoriteColorIds,
} from "src/shared/mockData";

export const sharedReducer = (
  state = initialState,
  action: RootAction
): SharedState => {
  switch (action.type) {
    case RootActionType.GetColors:
      return { ...state, colorsById: mockColorsById };
    case RootActionType.GetPalettes:
      return { ...state, palettesById: mockPalettesById };
    case RootActionType.GetUsers:
      return { ...state, usersById: mockUsersById };
    case RootActionType.GetFavoriteColorIds:
      return { ...state, favoriteColorIds: mockFavoriteColorIds };
    default:
      return state;
  }
};
