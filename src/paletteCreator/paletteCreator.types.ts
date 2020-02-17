import { Option, none } from "fp-ts/lib/Option";
import { Palette } from "/Users/emilyhansen/Desktop/palette-app/src/root/root.types";

export type State = {
  palette: Pick<
    Palette,
    "name" | "colors" | "description" | "private" | "tags"
  >;
};
