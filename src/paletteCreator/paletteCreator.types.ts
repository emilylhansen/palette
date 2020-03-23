import { Palette, Tag, Color } from "src/shared/shared.types";
import { none, Option } from "fp-ts/lib/Option";

export type Values = {
  name: string;
  description: string;
  colors: Array<Color>;
  tags: Array<Tag>;
  newTag: Option<string>;
};

export const makeInitialValuesCreate = (): Values => ({
  name: "",
  description: "",
  colors: [],
  tags: [],
  newTag: none,
});

export const makeInitialValuesEdit = (palette: Palette): Values => ({
  name: palette.name,
  description: palette.description,
  colors: palette.colors,
  tags: palette.tags,
  newTag: none,
});

export type Errors = Record<keyof Values, string>;
