import { AxiosError, AxiosResponse } from "axios";
import { range } from "fp-ts/lib/Array";
import { Dispatch } from "react";
import { DispatchProp, useDispatch } from "react-redux";
import { ThunkAction } from "redux-thunk";
import { Api, apiClient } from "src/root/root.api";
import {
  Error,
  GetColorPaletteInfoResponse,
  GetColorPalettesListResponse,
  GetObjectColorsResponse,
  GetRandomObjectResponse,
  Object,
} from "src/root/root.api.types";
import { COUNT } from "src/shared/mockData";
import {
  FAVORITE_COLOR,
  FAVORITE_PALETTE,
  GET_COLOR,
  GET_COLOR_PALETTE_INFO,
  GET_COLOR_PALETTES_LIST,
  GET_COLORS,
  GET_FAVORITE_COLOR_IDS,
  GET_FAVORITE_PALETTE_IDS,
  GET_OBJECT_COLORS,
  GET_PALETTES,
  GET_PALLETE,
  GET_RANDOM_OBJECT,
  GET_USER,
  GET_USERS,
  UNFAVORITE_COLOR,
  UNFAVORITE_PALETTE,
  PRIVATE_PALETTE,
  CREATE_PALETTE,
  UPDATE_PALETTE,
} from "src/shared/shared.constants";
import { isNil } from "src/shared/shared.typeGuards";
import { PayloadAction, SharedState, Palette } from "src/shared/shared.types";
import { makePackAction } from "src/root/root.helpers";
import { PackAction } from "src/root/root.types";

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
export const getFavoriteColorIds = (): PackAction<
  GetFavoriteColorIds["type"],
  GetFavoriteColorIds["payload"],
  undefined
> => {
  return makePackAction<
    GetFavoriteColorIds["type"],
    GetFavoriteColorIds["payload"],
    undefined
  >({
    type: GET_FAVORITE_COLOR_IDS,
    payload: {},
  });
};

export type GetFavoritePaletteIds = {
  type: GET_FAVORITE_PALETTE_IDS;
  payload: {};
};
export const getFavoritePaletteIds = (): PackAction<
  GetFavoritePaletteIds["type"],
  GetFavoritePaletteIds["payload"],
  undefined
> => {
  return makePackAction<
    GetFavoritePaletteIds["type"],
    GetFavoritePaletteIds["payload"],
    undefined
  >({
    type: GET_FAVORITE_PALETTE_IDS,
    payload: {},
  });
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
export const favoriteColor = (
  key: string
): PackAction<FavoriteColor["type"], FavoriteColor["payload"], undefined> => {
  return makePackAction<
    FavoriteColor["type"],
    FavoriteColor["payload"],
    undefined
  >({
    type: FAVORITE_COLOR,
    payload: { key },
  });
};

export type UnfavoriteColor = {
  type: UNFAVORITE_COLOR;
  payload: { key: string };
};
export const unfavoriteColor = (
  key: string
): PackAction<
  UnfavoriteColor["type"],
  UnfavoriteColor["payload"],
  undefined
> => {
  return makePackAction<
    UnfavoriteColor["type"],
    UnfavoriteColor["payload"],
    undefined
  >({
    type: UNFAVORITE_COLOR,
    payload: { key },
  });
};

export type FavoritePalette = {
  type: FAVORITE_PALETTE;
  payload: { key: string };
};
export const favoritePalette = (
  key: string
): PackAction<
  FavoritePalette["type"],
  FavoritePalette["payload"],
  undefined
> => {
  return makePackAction<
    FavoritePalette["type"],
    FavoritePalette["payload"],
    undefined
  >({
    type: FAVORITE_PALETTE,
    payload: { key },
  });
};

export type UnfavoritePalette = {
  type: UNFAVORITE_PALETTE;
  payload: { key: string };
};
export const unfavoritePalette = (
  key: string
): PackAction<
  UnfavoritePalette["type"],
  UnfavoritePalette["payload"],
  undefined
> => {
  return makePackAction<
    UnfavoritePalette["type"],
    UnfavoritePalette["payload"],
    undefined
  >({
    type: UNFAVORITE_PALETTE,
    payload: { key },
  });
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

export type PrivatePalette = {
  type: PRIVATE_PALETTE;
  payload: { isPrivate: boolean; paletteKey: string };
};
export const privatePalette = ({
  isPrivate,
  paletteKey,
}: {
  isPrivate: boolean;
  paletteKey: string;
}): PackAction<
  PrivatePalette["type"],
  PrivatePalette["payload"],
  undefined
> => {
  return makePackAction<
    PrivatePalette["type"],
    PrivatePalette["payload"],
    undefined
  >({
    type: PRIVATE_PALETTE,
    payload: { isPrivate, paletteKey },
  });
};

export const handleOnFavoritePalette = ({
  isFavorited,
  paletteKey,
}: {
  isFavorited: boolean;
  paletteKey: string;
}): ThunkAction<{}, SharedState, undefined, SharedAction> => dispatch =>
  isFavorited
    ? dispatch(unfavoritePalette(paletteKey))
    : dispatch(favoritePalette(paletteKey));

export const handleOnFavoriteColor = ({
  isFavorited,
  colorKey,
}: {
  isFavorited: boolean;
  colorKey: string;
}): ThunkAction<{}, SharedState, undefined, SharedAction> => dispatch =>
  isFavorited
    ? dispatch(unfavoriteColor(colorKey))
    : dispatch(favoriteColor(colorKey));

export type CreatePalette = {
  type: CREATE_PALETTE;
  payload: { palette: Palette };
};
export const createPalette = ({
  palette,
}: {
  palette: Palette;
}): PackAction<CreatePalette["type"], CreatePalette["payload"], undefined> => {
  return makePackAction<
    CreatePalette["type"],
    CreatePalette["payload"],
    undefined
  >({
    type: CREATE_PALETTE,
    payload: { palette },
  });
};

export type UpdatePalette = {
  type: UPDATE_PALETTE;
  payload: { palette: Palette };
};
export const updatePalette = ({
  palette,
}: {
  palette: Palette;
}): PackAction<UpdatePalette["type"], UpdatePalette["payload"], undefined> => {
  return makePackAction<
    UpdatePalette["type"],
    UpdatePalette["payload"],
    undefined
  >({
    type: UPDATE_PALETTE,
    payload: { palette },
  });
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
  FavoritePalette = "FAVORITE_PALETTE",
  UnfavoritePalette = "UNFAVORITE_PALETTE",
  FavoriteColor = "FAVORITE_COLOR",
  UnfavoriteColor = "UNFAVORITE_COLOR",
  PrivatePalette = "PRIVATE_PALETTE",
  CreatePalette = "CREATE_PALETTE",
  UpdatePalette = "UPDATE_PALETTE",
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
  | GetColorPaletteInfo
  | FavoritePalette
  | UnfavoritePalette
  | FavoriteColor
  | UnfavoriteColor
  | PrivatePalette
  | CreatePalette
  | UpdatePalette;
