import {
  ADD_COLOR,
  ADD_TAG,
  REMOVE_COLOR,
  REMOVE_TAG,
  SET_DESCRIPTION,
  SET_NAME,
  SET_PRIVATE,
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

export type SetName = {
  type: SET_NAME;
  payload: { value: string };
};

export const setName = (value: string): SetName => {
  return {
    type: SET_NAME,
    payload: { value },
  };
};

export type SetDescription = {
  type: SET_DESCRIPTION;
  payload: { value: string };
};

export const setDescription = (value: string): SetDescription => {
  return {
    type: SET_DESCRIPTION,
    payload: { value },
  };
};

export type SetPrivate = {
  type: SET_PRIVATE;
  payload: { private: boolean };
};

export const setPrivate = (isPrivate: boolean): SetPrivate => {
  return {
    type: SET_PRIVATE,
    payload: { private: isPrivate },
  };
};

export enum PaletteCreatorActionType {
  AddColor = "ADD_COLOR",
  AddTag = "ADD_TAG",
  RemoveColor = "REMOVE_COLOR",
  RemoveTag = "REMOVE_TAG",
  SetName = "SET_NAME",
  SetDescription = "SET_DESCRIPTION",
  SetPrivate = "SET_PRIVATE",
}

export type PaletteCreatorAction =
  | AddColor
  | AddTag
  | RemoveColor
  | RemoveTag
  | SetName
  | SetDescription
  | SetPrivate;
