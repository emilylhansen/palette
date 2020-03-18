import { RootState } from "src/root/root.types";
import {
  favoriteColorIdsLens,
  favoritePaletteIdsLens,
  colorsByIdLens,
  palettesByIdLens,
  usersByIdLens,
  objectsByIdLens,
  colorsByObjectIdLens,
  availablePalettesLens,
  colorsByPaletteIdLens,
} from "src/shared/shared.lenses";
import { sharedStateLens } from "src/root/root.lenses";
import { createSelector } from "reselect";
import {
  failure,
  fold,
  initial,
  pending,
  RemoteData,
  success,
  exists,
} from "@devexperts/remote-data-ts";

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

export const getObjectsById = (state: RootState) =>
  objectsByIdLens.get(sharedStateLens.get(state));

export const getColorsByObjectId = (state: RootState) =>
  colorsByObjectIdLens.get(sharedStateLens.get(state));

export const getAvailablePalettes = (state: RootState) =>
  availablePalettesLens.get(sharedStateLens.get(state));

export const getColorsByPaletteId = (state: RootState) =>
  colorsByPaletteIdLens.get(sharedStateLens.get(state));

export const isPaletteFavorited = (paletteKey: string) =>
  createSelector(getFavoritePaletteIds, (favoritePaletteIds): boolean =>
    exists<Array<string>>(favoritePaletteIds_ =>
      favoritePaletteIds_.includes(paletteKey)
    )(favoritePaletteIds)
  );
