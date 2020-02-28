import { RootState } from "src/root/root.types";

export const getSharedState = (state: RootState) => state.shared;

export const getPalettesById = (state: RootState) => state.shared.palettesById;

export const getColorsById = (state: RootState) => state.shared.colorsById;

export const getUsersById = (state: RootState) => state.shared.usersById;
