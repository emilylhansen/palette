import React, { ReactNode } from "react";
import styled, { css, FlattenSimpleInterpolation } from "styled-components";
import { isNil } from "src/shared/shared.typeGuards";

const GUTTER_SIZE = 16;

const TextBox = styled.div<Omit<TextProps, "children">>`
  ${({
    fontSize,
    fontWeight,
    css: css_,
    gutterTop,
    gutterBottom,
    gutterRight,
    gutterLeft,
  }) => css`
    font-size: ${fontSize}px;
    font-weight: ${isNil(fontWeight) ? 400 : fontWeight};
    margin: ${`${isNil(gutterTop) ? 0 : GUTTER_SIZE}px ${
      isNil(gutterRight) ? 0 : GUTTER_SIZE
    }px ${isNil(gutterBottom) ? 0 : GUTTER_SIZE}px ${
      isNil(gutterLeft) ? 0 : GUTTER_SIZE
    }px `};
    ${css_}
  `}
`;

type TextProps = {
  children: ReactNode;
  fontSize: number;
  fontWeight?: number;
  css?: FlattenSimpleInterpolation;
  gutterTop?: boolean;
  gutterRight?: boolean;
  gutterBottom?: boolean;
  gutterLeft?: boolean;
};

export const Text = ({
  children,
  fontSize,
  fontWeight,
  css: css_,
  gutterTop,
  gutterBottom,
  gutterRight,
  gutterLeft,
}: TextProps) => (
  <TextBox
    fontSize={fontSize}
    fontWeight={fontWeight}
    css={css_}
    gutterTop={gutterTop}
    gutterRight={gutterRight}
    gutterBottom={gutterBottom}
    gutterLeft={gutterLeft}
  >
    {children}
  </TextBox>
);
