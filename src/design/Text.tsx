import React, { ReactNode } from "react";
import styled, { css, FlattenSimpleInterpolation } from "styled-components";

const TextBox = styled.div<{
  fontSize: number;
  margin?: string;
  css?: FlattenSimpleInterpolation;
}>`
  ${({ fontSize, css: css_, margin }) => css`
    font-size: ${fontSize}px;
    margin: ${margin};
    ${css_}
  `}
`;

type TextProps = {
  children: ReactNode;
  css?: FlattenSimpleInterpolation;
  margin?: string;
};

export const T10 = ({ children, css: css_, margin }: TextProps) => (
  <TextBox fontSize={10} css={css_} margin={margin}>
    {children}
  </TextBox>
);

export const T12 = ({ children, css: css_, margin }: TextProps) => (
  <TextBox fontSize={12} css={css_} margin={margin}>
    {children}
  </TextBox>
);

export const T16 = ({ children, css: css_, margin }: TextProps) => (
  <TextBox fontSize={16} css={css_} margin={margin}>
    {children}
  </TextBox>
);

export const T20 = ({ children, css: css_, margin }: TextProps) => (
  <TextBox fontSize={20} css={css_} margin={margin}>
    {children}
  </TextBox>
);

export const T24 = ({ children, css: css_, margin }: TextProps) => (
  <TextBox fontSize={24} css={css_} margin={margin}>
    {children}
  </TextBox>
);

export const T28 = ({ children, css: css_, margin }: TextProps) => (
  <TextBox fontSize={28} css={css_} margin={margin}>
    {children}
  </TextBox>
);
