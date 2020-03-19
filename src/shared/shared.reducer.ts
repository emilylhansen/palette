import { GetFavoriteColorIdsHandlers } from "src/shared/handlers/GetFavoriteColorIdsHandlers";
import { GetFavoritePaletteIdsHandlers } from "src/shared/handlers/GetFavoritePaletteIdsHandlers";
import { GetRandomObjectHandlers } from "src/shared/handlers/GetRandomObjectHandlers";
import { FavoritePaletteHandlers } from "src/shared/handlers/FavoritePaletteHandlers";
import { UnfavoritePaletteHandlers } from "src/shared/handlers/UnfavoritePaletteHandlers";
import { FavoriteColorHandlers } from "src/shared/handlers/FavoriteColorHandlers";
import { UnfavoriteColorHandlers } from "src/shared/handlers/UnfavoriteColorHandlers";
import { PrivatePaletteHandlers } from "src/shared/handlers/PrivatePaletteHandlers";
import {
  mockColorsById,
  mockFavoriteColorIds,
  mockPalettesById,
  mockUsersById,
} from "src/shared/mockData";
import { SharedAction, SharedActionType } from "src/shared/shared.actions";
import { isNil } from "src/shared/shared.typeGuards";
import { initialState, SharedState } from "src/shared/shared.types";

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
    case SharedActionType.GetFavoritePaletteIds:
      return GetFavoritePaletteIdsHandlers({ state, action });
    case SharedActionType.GetFavoriteColorIds:
      return GetFavoriteColorIdsHandlers({ state, action });
    case SharedActionType.GetRandomObject:
      return GetRandomObjectHandlers({ state, action });
    case SharedActionType.FavoritePalette:
      return FavoritePaletteHandlers({ state, action });
    case SharedActionType.UnfavoritePalette:
      return UnfavoritePaletteHandlers({ state, action });
    case SharedActionType.FavoriteColor:
      return FavoriteColorHandlers({ state, action });
    case SharedActionType.UnfavoriteColor:
      return UnfavoriteColorHandlers({ state, action });
    case SharedActionType.PrivatePalette:
      return PrivatePaletteHandlers({ state, action });
    default:
      return state;
  }
};
