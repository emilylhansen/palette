import { ADD_COLOR } from "src/paletteCreator/paletteCreator.constants";
import { Palette, Color } from "src/shared/shared.types";

export type AddColor = {
  type: ADD_COLOR;
  payload: Color;
};

export const addColor = (color: Color): AddColor => {
  return {
    type: ADD_COLOR,
    payload: color,
  };
};

export enum PaletteCreatorActionType {
  AddColor = "ADD_COLOR",
}

export type PaletteCreatorAction = AddColor;
