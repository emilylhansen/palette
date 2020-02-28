import {
  GET_COLOR,
  GET_FAVORITE_COLOR_IDS,
  GET_FAVORITE_PALETTE_IDS,
  GET_PALLETE,
  GET_USER,
  GET_USERS,
  GET_COLORS,
  GET_PALETTES,
} from "src/shared/shared.constants";

export type GetColor = {
  type: GET_COLOR;
  payload: { key: string };
};
export const getColor = ({ key }: { key: string }): GetColor => {
  return {
    type: GET_COLOR,
    payload: { key },
  };
};

export type GetColors = {
  type: GET_COLORS;
  payload: {};
};
export const getColors = (): GetColors => {
  return {
    type: GET_COLORS,
    payload: {},
  };
};

export type GetPalette = {
  type: GET_PALLETE;
  payload: { key: string };
};
export const getPalette = ({ key }: { key: string }): GetPalette => {
  return {
    type: GET_PALLETE,
    payload: { key },
  };
};

export type GetPalettes = {
  type: GET_PALETTES;
  payload: {};
};
export const getPalettes = (): GetPalettes => {
  return {
    type: GET_PALETTES,
    payload: {},
  };
};

export type GetFavoriteColorIds = {
  type: GET_FAVORITE_COLOR_IDS;
  payload: {};
};
export const getFavoriteColorIds = (): GetFavoriteColorIds => {
  return {
    type: GET_FAVORITE_COLOR_IDS,
    payload: {},
  };
};

export type GetFavoritePaletteIds = {
  type: GET_FAVORITE_PALETTE_IDS;
  payload: {};
};
export const getFavoritePaletteIds = (): GetFavoritePaletteIds => {
  return {
    type: GET_FAVORITE_PALETTE_IDS,
    payload: {},
  };
};

export type GetUsers = {
  type: GET_USERS;
  payload: {};
};
export const getUsers = (): GetUsers => {
  return {
    type: GET_USERS,
    payload: {},
  };
};

export enum RootActionType {
  GetColor = "GET_COLOR",
  GetColors = "GET_COLORS",
  GetPalette = "GET_PALETTE",
  GetPalettes = "GET_PALETTES",
  GetFavoriteColorIds = "GET_FAVORITE_COLOR_IDS",
  GetFavoritePaletteIds = "GET_FAVORITE_PALETTE_IDS",
  GetUsers = "GET_USERS",
}

export type RootAction =
  | GetColor
  | GetColors
  | GetPalette
  | GetPalettes
  | GetFavoriteColorIds
  | GetFavoritePaletteIds
  | GetUsers;
