import { createSelector } from "reselect";
import { RootState } from "src/root/root.types";
import {
  paletteLens,
  colorsLens,
  nameLens,
  tagsLens,
  descriptionLens,
  privateLens,
} from "src/paletteCreator/paletteCreator.lenses";

export const getPaletteCreator = (state: RootState) => state.paletteCreator;

export const getPalette = createSelector(getPaletteCreator, paletteCreator =>
  paletteLens.get(paletteCreator)
);

export const getColors = createSelector(getPaletteCreator, paletteCreator =>
  colorsLens.get(paletteCreator)
);

export const getTags = createSelector(getPaletteCreator, paletteCreator =>
  tagsLens.get(paletteCreator)
);

export const getName = createSelector(getPaletteCreator, paletteCreator =>
  nameLens.get(paletteCreator)
);

export const getDescription = createSelector(
  getPaletteCreator,
  paletteCreator => descriptionLens.get(paletteCreator)
);

export const getPrivate = createSelector(getPaletteCreator, paletteCreator =>
  privateLens.get(paletteCreator)
);
