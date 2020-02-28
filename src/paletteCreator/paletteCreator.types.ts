import { Palette } from "src/shared/shared.types";

export type State = {
  palette: Pick<
    Palette,
    "name" | "colors" | "description" | "private" | "tags"
  >;
};
