import { Option, none } from "fp-ts/lib/Option";
import { Palette } from "src/root/root.types";

export type State = {
  palette: Pick<
    Palette,
    "name" | "colors" | "description" | "private" | "tags"
  >;
};
