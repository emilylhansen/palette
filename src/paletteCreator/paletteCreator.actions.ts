import {
  ADD_COLOR,
  ADD_TAG,
  REMOVE_COLOR,
  REMOVE_TAG,
} from "src/paletteCreator/paletteCreator.constants";
import { Palette, Color, Tag } from "src/shared/shared.types";

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

export type RemoveColor = {
  type: REMOVE_COLOR;
  payload: { key: string };
};

export const removeColor = (key: string): RemoveColor => {
  return {
    type: REMOVE_COLOR,
    payload: { key },
  };
};

export type AddTag = {
  type: ADD_TAG;
  payload: { value: string };
};

export const addTag = (value: string): AddTag => {
  return {
    type: ADD_TAG,
    payload: { value },
  };
};

export type RemoveTag = {
  type: REMOVE_TAG;
  payload: { key: string };
};

export const removeTag = (key: string): RemoveTag => {
  return {
    type: REMOVE_TAG,
    payload: { key },
  };
};

export enum PaletteCreatorActionType {
  AddColor = "ADD_COLOR",
  AddTag = "ADD_TAG",
  RemoveColor = "REMOVE_COLOR",
  RemoveTag = "REMOVE_TAG",
}

export type PaletteCreatorAction = AddColor | AddTag | RemoveColor | RemoveTag;
