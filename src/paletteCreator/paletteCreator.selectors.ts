import { createSelector } from "reselect";
import { RootState } from "src/root/root.types";
import { Color } from "src/shared/shared.types";
import {
  paletteLens,
  colorsLens,
  nameLens,
  tagsLens,
  descriptionLens,
  privateLens,
} from "src/paletteCreator/paletteCreator.lenses";
import { paletteCreatorStateLens } from "src/root/root.lenses";
import {
  getFavoriteColorIds,
  getColorsById,
} from "src/shared/shared.selectors";
import { lookup } from "fp-ts/lib/Record";
import { favoriteColorIdsLens, colorsByIdLens } from "../shared/shared.lenses";
import { pipe } from "fp-ts/lib/pipeable";
import { map, getOrElse } from "fp-ts/lib/Option";

export const getPaletteCreator = (state: RootState) =>
  paletteCreatorStateLens.get(state);

export const getPalette = (state: RootState) =>
  paletteLens.get(paletteCreatorStateLens.get(state));

export const getColors = (state: RootState) =>
  colorsLens.get(paletteCreatorStateLens.get(state));

export const getTags = (state: RootState) =>
  tagsLens.get(paletteCreatorStateLens.get(state));

export const getName = (state: RootState) =>
  nameLens.get(paletteCreatorStateLens.get(state));

export const getDescription = (state: RootState) =>
  descriptionLens.get(paletteCreatorStateLens.get(state));

export const getPrivate = (state: RootState) =>
  privateLens.get(paletteCreatorStateLens.get(state));

export const getFavoriteColorsById = createSelector(
  getFavoriteColorIds,
  getColorsById,
  (favoriteColorIds, colorsById): Record<string, Color> => {
    return favoriteColorIds.reduce<Record<string, Color>>(
      (acc, cur) =>
        pipe(
          lookup(cur, colorsById),
          map(c => ({ ...acc, [cur]: c })),
          getOrElse(() => acc)
        ),
      {}
    );
  }
);
