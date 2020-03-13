import React from "react";
import {
  default as MaterialIconButton,
  IconButtonProps as MaterialIconButtonProps,
} from "@material-ui/core/IconButton";
import { Icon } from "@material-ui/core";
import { FlattenSimpleInterpolation, css } from "styled-components";
import { styled } from "src/root/root.theme";

const StyledIconButton = styled(MaterialIconButton)<
  Pick<Props, "cssOverrides">
>`
  ${props => css`
    ${props.cssOverrides}
  `}
`;

type Props = MaterialIconButtonProps & {
  iconName: string;
  cssOverrides?: FlattenSimpleInterpolation;
};

export const IconButton = ({ iconName, ...materialIconButtonProps }: Props) => (
  <StyledIconButton color="secondary" {...materialIconButtonProps}>
    <Icon>{iconName}</Icon>
  </StyledIconButton>
);
