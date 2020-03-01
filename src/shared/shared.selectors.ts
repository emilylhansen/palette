import { RootState } from "src/root/root.types";
import {
  favoriteColorIdsLens,
  favoritePaletteIdsLens,
  colorsByIdLens,
  palettesByIdLens,
  usersByIdLens,
} from "src/shared/shared.lenses";
import { sharedStateLens } from "src/root/root.lenses";

export const getSharedState = (state: RootState) => sharedStateLens.get(state);

export const getPalettesById = (state: RootState) =>
  palettesByIdLens.get(sharedStateLens.get(state));

export const getColorsById = (state: RootState) =>
  colorsByIdLens.get(sharedStateLens.get(state));

export const getUsersById = (state: RootState) =>
  usersByIdLens.get(sharedStateLens.get(state));

export const getFavoriteColorIds = (state: RootState) =>
  favoriteColorIdsLens.get(sharedStateLens.get(state));

export const getFavoritePaletteIds = (state: RootState) =>
  favoritePaletteIdsLens.get(sharedStateLens.get(state));
