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
  exists as remoteExists,
} from "@devexperts/remote-data-ts";
import { getCurrentUser } from "src/auth/auth.selectors";
import { lookup } from "fp-ts/lib/ReadonlyRecord";
import { Palette, User } from "src/shared/shared.types";
import { exists as optionExists, Option, none, None } from "fp-ts/lib/Option";
import { pipe } from "fp-ts/lib/pipeable";

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
    remoteExists<Array<string>>(favoritePaletteIds_ =>
      favoritePaletteIds_.includes(paletteKey)
    )(favoritePaletteIds)
  );

export const isColorFavorited = (colorKey: string) =>
  createSelector(getFavoriteColorIds, (favoriteColorIds): boolean =>
    remoteExists<Array<string>>(favoriteColorIds_ =>
      favoriteColorIds_.includes(colorKey)
    )(favoriteColorIds)
  );

export const isCurrentUsersPalette = (paletteKey: string) =>
  createSelector(
    getPalettesById,
    getCurrentUser,
    (palettesById, currentUser): boolean => {
      const currentUserOption = fold<string, Option<User>, Option<User>>(
        () => none,
        () => none,
        () => none,
        currentUser_ => currentUser_
      )(currentUser);

      const palette = lookup(paletteKey, palettesById);

      return optionExists<Palette>(palette_ =>
        optionExists<User>(
          currentUserOption_ =>
            palette_.key === paletteKey &&
            palette_.authorId === currentUserOption_.key
        )(currentUserOption)
      )(palette);
    }
  );
