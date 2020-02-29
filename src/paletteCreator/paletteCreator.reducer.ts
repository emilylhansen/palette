import { Action } from "redux";
import {
  initialState,
  PaletteCreatorState,
} from "src/paletteCreator/paletteCreator.types";
import {
  PaletteCreatorAction,
  PaletteCreatorActionType,
} from "src/paletteCreator/paletteCreator.actions";
import { Option, none, some } from "fp-ts/lib/Option";

export const paletteCreatorReducer = (
  state = initialState,
  action: PaletteCreatorAction
): PaletteCreatorState => {
  switch (action.type) {
    case PaletteCreatorActionType.AddColor:
      const newPalette = {
        ...state.palette,
        colors: [...state.palette.colors, action.payload],
      };

      return { ...state, palette: newPalette };
    default:
      return state;
  }
};
