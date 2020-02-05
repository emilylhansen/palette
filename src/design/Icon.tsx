import React from "react";
import { connect, ConnectedProps, Provider } from "react-redux";
import { createStore, Dispatch } from "redux";
import styled, { css, FlattenSimpleInterpolation } from "styled-components";

type PassedProps = { iconName: string; css?: FlattenSimpleInterpolation };
type InjectedProps = {};
export type Props = PassedProps & InjectedProps;

const StyledIcon = styled.i<Pick<Props, "css">>`
  ${({ css: css_ }) => css`
    ${css_}
  `}
`;

export const Icon = ({ iconName, css: css_ }: Props) => {
  return (
    <StyledIcon css={css_} className="material-icons md-12">
      {iconName}
    </StyledIcon>
  );
};
