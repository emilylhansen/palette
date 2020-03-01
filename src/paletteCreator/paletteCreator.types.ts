import { Palette } from "src/shared/shared.types";

export type PaletteCreatorState = {
  palette: Palette;
};

export const initialState: PaletteCreatorState = {
  palette: {
    name: "New Palette",
    colors: [],
    description: "",
    private: true,
    tags: [],
    authorId: "",
    key: "",
  },
};
