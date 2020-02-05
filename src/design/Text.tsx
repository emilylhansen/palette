import React, { ReactNode } from "react";
import styled, { css, FlattenSimpleInterpolation } from "styled-components";

const TextBox = styled.div<{
  fontSize: number;
  css?: FlattenSimpleInterpolation;
}>`
  ${({ fontSize, css: css_ }) => css`
    font-size: ${fontSize}px;

    ${css_}
  `}
`;

type TextProps = { children: ReactNode; css?: FlattenSimpleInterpolation };

export const T10 = ({ children, css: css_ }: TextProps) => (
  <TextBox fontSize={10} css={css_}>
    {children}
  </TextBox>
);

export const T12 = ({ children, css: css_ }: TextProps) => (
  <TextBox fontSize={12} css={css_}>
    {children}
  </TextBox>
);

export const T16 = ({ children, css: css_ }: TextProps) => (
  <TextBox fontSize={16} css={css_}>
    {children}
  </TextBox>
);

export const T20 = ({ children, css: css_ }: TextProps) => (
  <TextBox fontSize={20} css={css_}>
    {children}
  </TextBox>
);

export const T24 = ({ children, css: css_ }: TextProps) => (
  <TextBox fontSize={24} css={css_}>
    {children}
  </TextBox>
);

export const T28 = ({ children, css: css_ }: TextProps) => (
  <TextBox fontSize={28} css={css_}>
    {children}
  </TextBox>
);
