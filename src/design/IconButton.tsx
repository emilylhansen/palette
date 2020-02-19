import React from "react";
import styled, { css, FlattenSimpleInterpolation } from "styled-components";
import { Icon, Props as IconProps } from "src/design/Icon";
import {
  default as MaterialIconButton,
  IconButtonProps as MaterialIconButtonProps,
} from "@material-ui/core/IconButton";

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
