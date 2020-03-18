import {
  failure,
  initial,
  pending,
  RemoteData,
  success,
} from "@devexperts/remote-data-ts";
import { AxiosError } from "axios";
import {
  ColorPaletteColor,
  Error,
  GetRandomObjectResponse,
  Object,
  ObjectColor,
} from "src/root/root.api.types";

export type SharedState = {
  palettesById: Record<string, Palette>;
  colorsById: Record<string, Color>;
  usersById: Record<string, User>;
  favoritePaletteIds: RemoteData<string, Array<string>>;
  favoriteColorIds: RemoteData<string, Array<string>>;
  objectsById: Record<string, RemoteData<string, Object>>;
  colorsByObjectId: Record<string, RemoteData<string, Array<ObjectColor>>>;
  availablePalettes: RemoteData<string, Record<string, string>>;
  colorsByPaletteId: Record<
    string,
    RemoteData<string, Record<string, ColorPaletteColor>>
  >;
};

export const initialState: SharedState = {
  palettesById: {},
  colorsById: {},
  usersById: {},
  favoritePaletteIds: initial,
  favoriteColorIds: initial,
  objectsById: {},
  colorsByObjectId: {},
  availablePalettes: initial,
  colorsByPaletteId: {},
};

export type Color = {
  name: string;
  hex: string;
  key: string;
};

export type Tag = {
  value: string;
  key: string;
};

export type Palette = {
  name: string;
  description: string;
  colors: Array<Color>;
  private: boolean;
  authorId: string;
  key: string;
  tags: Array<Tag>;
};

export type User = {
  name: string;
  description: string;
  avatar: string;
  key: string;
  email: string;
  createOn: Date;
};

export type Activity = {
  userKey: string;
  entityKey: string;
  date: Date;
  activity: "favorite" | "share";
};

export type PayloadAction<A extends { promise: unknown }, B> = Omit<
  A,
  "promise"
> & { payload: B };
