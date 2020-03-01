export type SharedState = {
  palettesById: Record<string, Palette>;
  colorsById: Record<string, Color>;
  usersById: Record<string, User>;
  favoritedPaletteIds: Record<string, boolean>;
  favoritedColorIds: Record<string, boolean>;
};

export const initialState: SharedState = {
  palettesById: {},
  colorsById: {},
  usersById: {},
  favoritedPaletteIds: {},
  favoritedColorIds: {},
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
