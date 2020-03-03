import { CREATE_PALETTE } from "src/paletteCreator/paletteCreator.constants";
import { Palette, Color, Tag } from "src/shared/shared.types";

export type CreatePalette = {
  type: CREATE_PALETTE;
  payload: {};
};

export const createPalette = (): CreatePalette => {
  return {
    type: CREATE_PALETTE,
    payload: {},
  };
};

export enum PaletteCreatorActionType {
  CreatePalette = "CREATE_PALETTE",
}

export type PaletteCreatorAction = CreatePalette;
