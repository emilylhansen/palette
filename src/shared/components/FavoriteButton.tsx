import React from "react";
import { css, FlattenSimpleInterpolation } from "styled-components";
import { styled } from "src/root/root.theme";
import { IconButton } from "src/design/IconButton";
import { IconButtonProps as MaterialIconButtonProps } from "@material-ui/core/IconButton";

const StyledIconButton = styled(IconButton)`
  ${props =>
    css`
      color: ${props.theme.main.tertiary.main};
    `}
`;

type Props = {
  isFavorited: boolean;
  cssOverrides?: FlattenSimpleInterpolation;
} & MaterialIconButtonProps;

export const FavoriteButton = ({
  isFavorited,
  cssOverrides,
  ...materialIconButtonProps
}: Props) => (
  <StyledIconButton
    color="secondary"
    size="small"
    iconName={isFavorited ? "favorite" : "favorite_border"}
    cssOverrides={cssOverrides}
    {...materialIconButtonProps}
  />
);
