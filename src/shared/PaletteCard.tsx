import React from "react";
import { connect, ConnectedProps, Provider } from "react-redux";
import { createStore, Dispatch } from "redux";
import styled from "styled-components";
import {
  T12,
  T24,
} from "/Users/emilyhansen/Desktop/palette-app/src/design/Text";
import { Palette } from "../root/root.types";
import { Icon } from "/Users/emilyhansen/Desktop/palette-app/src/design/Icon";

const PaletteCardBox = styled.div`
  width: 400px;
  height: 300px;
  padding: 16px;
`;

const FeaturesBox = styled.div`
  display: flex;
`;

const FavoriteBox = styled.div``;

type PassedProps = { palette: Palette };
type InjectedProps = {};
type Props = PassedProps & InjectedProps;

export const PaletteCard = ({ palette }: Props) => {
  return (
    <PaletteCardBox>
      <T24>{palette.name}</T24>
      <T12>hi</T12>
      <FeaturesBox>
        <Icon iconName="favorite" />
        <Icon iconName="favorite_border" />
        <Icon iconName="lock" />
        <Icon iconName="lock_open" />
        <Icon iconName="edit" />
      </FeaturesBox>
    </PaletteCardBox>
  );
};
