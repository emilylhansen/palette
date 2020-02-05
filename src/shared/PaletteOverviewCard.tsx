import React from "react";
import { connect, ConnectedProps, Provider } from "react-redux";
import { createStore, Dispatch } from "redux";
import styled, { css } from "styled-components";
import {
  T12,
  T24,
} from "/Users/emilyhansen/Desktop/palette-app/src/design/Text";
import { Palette } from "/Users/emilyhansen/Desktop/palette-app/src/root/root.types";
import { Icon } from "/Users/emilyhansen/Desktop/palette-app/src/design/Icon";
import { PaletteTemplate } from "/Users/emilyhansen/Desktop/palette-app/src/shared/PaletteTemplate";
import { IconButton } from "/Users/emilyhansen/Desktop/palette-app/src/design/IconButton";
import Chip from "@material-ui/core/Chip";

const overrides = {
  favorite: css`
    margin-right: 8px;
  `,
};

const PaletteOverviewCardBox = styled.div`
  width: 400px;
  height: 300px;
  padding: 24px;
  border-radius: 3px;
  background: #fff;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 10px;
`;

const FeaturesBox = styled.div`
  display: flex;

  > div {
    margin-right: 16px;
  }
`;

const IconButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const TagsBox = styled.div`
  display: flex;

  > div {
    margin-right: 8px;
  }
`;

const FavoriteBox = styled.div`
  display: flex;
  align-items: center;
`;

const Favorite = ({
  isFavorited,
  count,
}: {
  isFavorited: boolean;
  count: number;
}) => (
  <FavoriteBox>
    <IconButton
      color="secondary"
      size="small"
      iconName={isFavorited ? "favorite" : "favorite_border"}
      css={overrides.favorite}
    />
    <T12>{count}</T12>
  </FavoriteBox>
);

type PassedProps = { palette: Palette };
type InjectedProps = {};
type Props = PassedProps & InjectedProps;

export const PaletteOverviewCard = ({ palette }: Props) => {
  return (
    <PaletteOverviewCardBox>
      <IconButtonBox>
        <IconButton color="secondary" size="small" iconName="close" />
      </IconButtonBox>
      <T24>{palette.name}</T24>
      <T12>{palette.authorId}</T12>
      <TagsBox>
        {palette.tags.map(tag => (
          <Chip key={tag.key} label={tag.name} size="small" color="secondary" />
        ))}
      </TagsBox>
      <FeaturesBox>
        <Favorite isFavorited={false} count={12} />
        <IconButton
          color="secondary"
          size="small"
          iconName={palette.private ? "lock" : "lock_open"}
        />
        {true && (
          <IconButton color="secondary" size="small" iconName={"edit"} />
        )}
      </FeaturesBox>
      <PaletteTemplate palette={palette} />
    </PaletteOverviewCardBox>
  );
};
