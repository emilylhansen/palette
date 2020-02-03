import React from "react";
import { connect, ConnectedProps, Provider } from "react-redux";
import { createStore, Dispatch } from "redux";
import styled from "styled-components";
import { Navigation } from "/Users/emilyhansen/Desktop/palette-app/src/shared/Navigation";

const HeaderBox = styled.div`
  height: 32px;
  border: 1px solid;
  display: flex;
  justify-content: space-between;
  padding: 8px 16px;
  align-items: center;
`;

type PassedProps = {};
type InjectedProps = {};
type Props = PassedProps & InjectedProps;

export const Header = ({}: Props) => {
  return (
    <HeaderBox>
      Palette App <Navigation />
    </HeaderBox>
  );
};
