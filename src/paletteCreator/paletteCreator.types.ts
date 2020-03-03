import { Palette, Tag, Color } from "src/shared/shared.types";
import { none, Option } from "fp-ts/lib/Option";

export type PaletteCreatorState = {};

export const initialState: PaletteCreatorState = {};

export type Values = {
  name: string;
  description: string;
  colors: Array<Color>;
  tags: Array<Tag>;
  newTag: Option<string>;
};

export const initialValues: Values = {
  name: "",
  description: "",
  colors: [],
  tags: [],
  newTag: none,
};

export type Errors = Record<keyof Values, string>;
