import { createSelector } from "reselect";
import { RootState } from "src/root/root.types";

export const getPalette = (state: RootState) => state.paletteCreator.palette;
