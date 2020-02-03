import React, { ReactNode } from "react";
import { connect, ConnectedProps, Provider } from "react-redux";
import { createStore, Dispatch } from "redux";
import styled, { css } from "styled-components";

const TextBox = styled.div<{ fontSize: number }>`
  ${({ fontSize }) => css`
    font-size: ${fontSize}px;
  `}
`;

export const T12 = ({ children }: { children: ReactNode }) => (
  <TextBox fontSize={12}>{children}</TextBox>
);

export const T16 = ({ children }: { children: ReactNode }) => (
  <TextBox fontSize={16}>{children}</TextBox>
);

export const T20 = ({ children }: { children: ReactNode }) => (
  <TextBox fontSize={20}>{children}</TextBox>
);

export const T24 = ({ children }: { children: ReactNode }) => (
  <TextBox fontSize={24}>{children}</TextBox>
);

export const T28 = ({ children }: { children: ReactNode }) => (
  <TextBox fontSize={28}>{children}</TextBox>
);
