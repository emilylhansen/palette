import React, { forwardRef } from "react";
import {
  default as MUIIconButton,
  IconButtonProps as MaterialIconButtonProps,
} from "@material-ui/core/IconButton";
import { Icon } from "@material-ui/core";
import { FlattenSimpleInterpolation, css } from "styled-components";
import { styled } from "src/root/root.theme";
import { makeStyles } from "@material-ui/core/styles";
import { Text } from "src/design/Text";
import { isNil } from "src/shared/shared.typeGuards";
import { GutterSize, Gutters, makeGutters } from "src/design/design.helpers";

const IconButtonBox = styled.div<
  {
    cssOverrides: Props["cssOverrides"];
  } & Gutters
>`
  display: flex;
  align-items: center;

  ${({ cssOverrides, gutterTop, gutterBottom, gutterRight, gutterLeft }) =>
    css`
      margin: ${makeGutters({
        gutterTop,
        gutterBottom,
        gutterRight,
        gutterLeft,
      })};

      ${cssOverrides};
    `}
`;

type Props = {
  iconName: string;
  label?: string;
  cssOverrides?: FlattenSimpleInterpolation;
} & Gutters &
  MaterialIconButtonProps;

export const IconButton = ({
  iconName,
  label,
  cssOverrides,
  gutterTop,
  gutterBottom,
  gutterRight,
  gutterLeft,
  ...materialIconButtonProps
}: Props) => (
  <IconButtonBox
    cssOverrides={cssOverrides}
    gutterTop={gutterTop}
    gutterBottom={gutterBottom}
    gutterRight={gutterRight}
    gutterLeft={gutterLeft}
  >
    <MUIIconButton color="secondary" {...materialIconButtonProps}>
      <Icon>{iconName}</Icon>
    </MUIIconButton>
    {!isNil(label) && (
      <Text gutterLeft={GutterSize.Small} variant="body2">
        {label}
      </Text>
    )}
  </IconButtonBox>
);
