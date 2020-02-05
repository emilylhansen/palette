import React from "react";
import { connect, ConnectedProps, Provider } from "react-redux";
import { createStore, Dispatch } from "redux";
import styled, { css, FlattenSimpleInterpolation } from "styled-components";
import {
  T12,
  T24,
} from "/Users/emilyhansen/Desktop/palette-app/src/design/Text";
import { Palette } from "/Users/emilyhansen/Desktop/palette-app/src/root/root.types";
import {
  Icon,
  Props as IconProps,
} from "/Users/emilyhansen/Desktop/palette-app/src/design/Icon";
import { PaletteTemplate } from "/Users/emilyhansen/Desktop/palette-app/src/shared/PaletteTemplate";
import Button from "@material-ui/core/Button";
import {
  default as MaterialIconButton,
  IconButtonProps as MaterialIconButtonProps,
} from "@material-ui/core/IconButton";
import { Overlay } from "/Users/emilyhansen/Desktop/palette-app/src/shared/Overlay";

const MaterialIconButtonBox = styled.div<{ css: FlattenSimpleInterpolation }>`
  ${({ css: css_ }) =>
    css`
      ${css_}
    `}
`;

type Props = Pick<IconProps, "iconName"> &
  MaterialIconButtonProps & { css?: FlattenSimpleInterpolation };

export const IconButton = ({
  iconName,
  css: css_,
  ...materialIconButtonProps
}: Props) => {
  return (
    <MaterialIconButtonBox css={css_}>
      <MaterialIconButton color="secondary" {...materialIconButtonProps}>
        <Icon iconName={iconName} />
      </MaterialIconButton>
    </MaterialIconButtonBox>
  );
};
