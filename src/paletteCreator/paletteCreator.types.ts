import { Palette } from "src/shared/shared.types";

export type PaletteCreatorState = {
  palette: Pick<
    Palette,
    "name" | "colors" | "description" | "private" | "tags"
  >;
};

export const initialState: PaletteCreatorState = {
  palette: {
    name: "New Palette",
    colors: [],
    description: "",
    private: true,
    tags: [],
  },
};
