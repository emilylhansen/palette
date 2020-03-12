import {
  GET_COLOR,
  GET_FAVORITE_COLOR_IDS,
  GET_FAVORITE_PALETTE_IDS,
  GET_PALLETE,
  GET_USER,
  GET_USERS,
  GET_COLORS,
  GET_PALETTES,
  FAVORITE_COLOR,
  FAVORITE_PALETTE,
  GET_RANDOM_OBJECT,
  GET_COLOR_PALETTES_LIST,
  GET_COLOR_PALETTE_INFO,
  GET_OBJECT_COLORS,
} from "src/shared/shared.constants";
import { apiClient, Api } from "src/root/root.api";
import {
  Object,
  Error,
  GetRandomObjectResponse,
  GetObjectColorsResponse,
  GetColorPalettesListResponse,
  GetColorPaletteInfoResponse,
} from "src/root/root.api.types";
import { AxiosError, AxiosResponse } from "axios";
import { COUNT } from "src/shared/mockData";
import { range } from "fp-ts/lib/Array";
import { useDispatch, DispatchProp } from "react-redux";
import { Dispatch } from "react";
import { ThunkAction } from "redux-thunk";
import { SharedState, PayloadAction } from "src/shared/shared.types";
import { isNil } from "src/shared/shared.typeGuards";

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
// export type GetPalettes = {
//   type: GET_PALETTES;
//   payload: {
//     objects: Array<GetRandomObject>;
//     objectColors: Array<GetObjectColors>;
//     paletteList: GetColorPalettesList;
//     colorPaletteInfo: Array<GetColorPaletteInfo>;
//   };
// };
// export const getPalettes = (): ThunkAction<
//   {},
//   SharedState,
//   undefined,
//   SharedAction
// > => {
//   return async (dispatch): Promise<GetPalettes> => {
//     /** fetch a bunch of random objects to create mock data */
//     const objectsRes = await Promise.all(
//       range(0, 10).map(async _ => {
//         /** fetch a random object */
//         return dispatch(getRandomObject());
//       })
//     );
//     const objectColorsRes = await Promise.all(
//       objectsRes.map(o => {
//         const o_ = (o as unknown) as GetRandomObjectPayload;
//         return dispatch(getObjectColors(o_.payload.data.object.id));
//       })
//     );

//     /** fetch available color palettes */
//     const palettesListRes = await dispatch(getColorPalettesList());
//     const palettesListResData = (palettesListRes as unknown) as GetColorPalettesListPayload;
//     /**
//      * fetch the info for each palette, which will give us a list
//      * of colors that we can use to look up the name of the object's
//      * colors fetched above.
//      */
//     const colorPaletteInfoRes = await Promise.all(
//       Object.keys(palettesListResData.payload.data.palettes).map(pKey =>
//         dispatch(getColorPaletteInfo(pKey))
//       )
//     );

//     return {
//       type: GET_PALETTES,
//       payload: {
//         objects: objectsRes,
//         objectColors: objectColorsRes,
//         paletteList: palettesListRes,
//         colorPaletteInfo: colorPaletteInfoRes,
//       },
//     };
//   };
// };

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

export type FavoriteColor = {
  type: FAVORITE_COLOR;
  payload: { key: string };
};
export const favoriteColor = (key: string): FavoriteColor => {
  return {
    type: FAVORITE_COLOR,
    payload: { key },
  };
};

export type FavoritePalette = {
  type: FAVORITE_PALETTE;
  payload: { key: string };
};
export const favoritePalette = (key: string): FavoritePalette => {
  return {
    type: FAVORITE_PALETTE,
    payload: { key },
  };
};

export type GetRandomObjectPayload = PayloadAction<
  GetRandomObject,
  AxiosResponse<GetRandomObjectResponse>
>;
export type GetRandomObject = {
  type: GET_RANDOM_OBJECT;
  promise: Promise<AxiosResponse<GetRandomObjectResponse>>;
};
export const getRandomObject = (): GetRandomObject => {
  return {
    type: GET_RANDOM_OBJECT,
    promise: Api.getRandomObject(),
  };
};

export type GetObjectColors = {
  type: GET_OBJECT_COLORS;
  promise: Promise<AxiosResponse<GetObjectColorsResponse>>;
  meta: { id: string };
};
export const getObjectColors = (id: string): GetObjectColors => {
  return {
    type: GET_OBJECT_COLORS,
    promise: Api.getObjectColors(id),
    meta: { id },
  };
};

export type GetColorPalettesListPayload = PayloadAction<
  GetColorPalettesList,
  AxiosResponse<GetColorPalettesListResponse>
>;
export type GetColorPalettesList = {
  type: GET_COLOR_PALETTES_LIST;
  promise: Promise<AxiosResponse<GetColorPalettesListResponse>>;
};
export const getColorPalettesList = (): GetColorPalettesList => {
  return {
    type: GET_COLOR_PALETTES_LIST,
    promise: Api.getColorPalettesList(),
  };
};

export type GetColorPaletteInfo = {
  type: GET_COLOR_PALETTE_INFO;
  promise: Promise<AxiosResponse<GetColorPaletteInfoResponse>>;
  meta: { id: string };
};
export const getColorPaletteInfo = (id: string): GetColorPaletteInfo => {
  return {
    type: GET_COLOR_PALETTE_INFO,
    promise: Api.getColorPaletteInfo(id),
    meta: { id },
  };
};

export enum SharedActionType {
  GetColor = "GET_COLOR",
  GetColors = "GET_COLORS",
  GetPalette = "GET_PALETTE",
  GetPalettes = "GET_PALETTES",
  GetFavoriteColorIds = "GET_FAVORITE_COLOR_IDS",
  GetFavoritePaletteIds = "GET_FAVORITE_PALETTE_IDS",
  GetUsers = "GET_USERS",
  GetRandomObject = "GET_RANDOM_OBJECT",
  GetObjectColors = "GET_OBJECT_COLORS",
  GetColorPalettesList = "GET_COLOR_PALETTES_LIST",
  GetColorPaletteInfo = "GET_COLOR_PALETTE_INFO",
}

export type SharedAction =
  | GetColor
  | GetColors
  | GetPalette
  | GetPalettes
  | GetFavoriteColorIds
  | GetFavoritePaletteIds
  | GetUsers
  | GetRandomObject
  | GetObjectColors
  | GetColorPalettesList
  | GetColorPaletteInfo;
