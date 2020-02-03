import React from "react";
import { connect, ConnectedProps, Provider } from "react-redux";
import { createStore, Dispatch } from "redux";
import styled from "styled-components";

const HeaderBox = styled.div`
  width: 100%;
  height: 32px;
`;

type PassedProps = {};
type InjectedProps = {};
type Props = PassedProps & InjectedProps;

export const Header = ({}: Props) => {
  return <HeaderBox>Palette App</HeaderBox>;
};
