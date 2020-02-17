import React from "react";
import { connect, ConnectedProps, Provider } from "react-redux";
import { createStore, Dispatch } from "redux";
import styled, { css } from "styled-components";
import {
  T12,
  T24,
} from "/Users/emilyhansen/Desktop/palette-app/src/design/Text";
import {
  Palette,
  Color,
} from "/Users/emilyhansen/Desktop/palette-app/src/root/root.types";
import { Icon } from "/Users/emilyhansen/Desktop/palette-app/src/design/Icon";
import convert from "color-convert";
import { isNil } from "/Users/emilyhansen/Desktop/palette-app/src/shared/shared.typeGuards";
import { lookup } from "fp-ts/lib/Array";

export const convertHexToRGBA = ({
  hex,
  opacity,
}: {
  hex: string;
  opacity?: number;
}): string => {
  const rgbList = convert.hex.rgb(hex);

  /** don't do this */
  const r = lookup(0, rgbList);
  const g = lookup(0, rgbList);
  const b = lookup(0, rgbList);

  const rgbaString = `rgba(${r}, ${g}, ${b}, ${isNil(opacity) ? 1 : opacity})`;

  return rgbaString;
};
