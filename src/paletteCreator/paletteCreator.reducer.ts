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
import {
  paletteLens,
  colorsLens,
  nameLens,
  tagsLens,
} from "src/paletteCreator/paletteCreator.lenses";
import {
  paletteAuthorIdLens,
  paletteColorsLens,
  paletteDescriptionLens,
  paletteKeyLens,
  paletteNameLens,
  palettePrivateLens,
  paletteTagsLens,
} from "src/shared/shared.lenses";
import { makeNewTag } from "src/paletteCreator/paletteCreator.helpers";

export const paletteCreatorReducer = (
  state = initialState,
  action: PaletteCreatorAction
): PaletteCreatorState => {
  switch (action.type) {
    case PaletteCreatorActionType.AddColor:
      const newPaletteAddColor = paletteColorsLens.set([
        ...colorsLens.get(state),
        action.payload,
      ])(paletteLens.get(state));

      return { ...state, palette: newPaletteAddColor };
    case PaletteCreatorActionType.RemoveColor:
      const newPaletteRemoveColor = paletteColorsLens.set(
        [...colorsLens.get(state)].filter(c => c.key !== action.payload.key)
      )(paletteLens.get(state));

      return { ...state, palette: newPaletteRemoveColor };
    case PaletteCreatorActionType.AddTag:
      const newPaletteAddTag = paletteTagsLens.set([
        ...tagsLens.get(state),
        makeNewTag(action.payload.value),
      ])(paletteLens.get(state));

      return { ...state, palette: newPaletteAddTag };
    case PaletteCreatorActionType.RemoveTag:
      const newPaletteRemoveTag = paletteTagsLens.set(
        [...tagsLens.get(state)].filter(t => t.key !== action.payload.key)
      )(paletteLens.get(state));

      return { ...state, palette: newPaletteRemoveTag };
    default:
      return state;
  }
};