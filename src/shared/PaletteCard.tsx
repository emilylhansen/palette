import React from "react";
import { connect, ConnectedProps, Provider } from "react-redux";
import { createStore, Dispatch } from "redux";
import styled from "styled-components";
import {
  T12,
  T24,
} from "/Users/emilyhansen/Desktop/palette-app/src/design/Text";
import { Palette } from "/Users/emilyhansen/Desktop/palette-app/src/root/root.types";
import { Icon } from "/Users/emilyhansen/Desktop/palette-app/src/design/Icon";

const PaletteCardBox = styled.div`
  width: 400px;
  height: 300px;
  padding: 16px;
  border: 1px solid;
`;

const FeaturesBox = styled.div`
  display: flex;
`;

const FavoriteBox = styled.div`
  display: flex;
`;

const Favorite = ({
  isFavorited,
  count,
}: {
  isFavorited: boolean;
  count: number;
}) => (
  <FavoriteBox>
    <Icon iconName={isFavorited ? "favorite" : "favorite_border"} />
    <T12>{count}</T12>
  </FavoriteBox>
);

type PassedProps = { palette: Palette };
type InjectedProps = {};
type Props = PassedProps & InjectedProps;

export const PaletteCard = ({ palette }: Props) => {
  return (
    <PaletteCardBox>
      <T24>{palette.name}</T24>
      <T12>hi</T12>
      <FeaturesBox>
        <Favorite isFavorited={false} count={12} />
        <Icon iconName={true ? "lock" : "lock_open"} />
        {true && <Icon iconName="edit" />}
      </FeaturesBox>
    </PaletteCardBox>
  );
};
