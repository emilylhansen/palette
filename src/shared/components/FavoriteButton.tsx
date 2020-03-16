import React from "react";
import { css, FlattenSimpleInterpolation } from "styled-components";
import { styled } from "src/root/root.theme";
import { IconButton } from "src/design/IconButton";
import { IconButtonProps as MaterialIconButtonProps } from "@material-ui/core/IconButton";
import { isNil } from "src/shared/shared.typeGuards";

const StyledIconButton = styled(IconButton)`
  ${props =>
    css`
      color: ${props.theme.main.tertiary.main};
    `}
`;

type Props = {
  isFavorited: boolean;
  cssOverrides?: FlattenSimpleInterpolation;
  count?: number;
} & MaterialIconButtonProps;

export const FavoriteButton = ({
  isFavorited,
  cssOverrides,
  count,
  ...materialIconButtonProps
}: Props) => (
  <StyledIconButton
    iconName={isFavorited ? "favorite" : "favorite_border"}
    cssOverrides={cssOverrides}
    label={isNil(count) ? undefined : count.toString()}
    {...materialIconButtonProps}
  />
);
