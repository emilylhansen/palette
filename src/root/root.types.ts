import { AuthReducerState } from "src/auth/auth.types";

export type RootState = {
  auth: AuthReducerState;
  palettesById: Record<string, Palette>;
  colorsById: Record<string, Color>;
  usersById: Record<string, User>;
  favoritedPaletteIds: Record<string, boolean>;
  favoritedColorIds: Record<string, boolean>;
};

export type Color = {
  name: string;
  description: string;
  hex: string;
  private: boolean;
  key: string;
};

export type Tag = {
  name: string;
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
