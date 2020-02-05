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
import {
  AnchoredMenu,
  MenuItem,
} from "/Users/emilyhansen/Desktop/palette-app/src/design/AnchoredMenu";

const overrides = {
  favorite: css`
    margin-right: 4px;
  `,
};

const PaletteOverviewCardBox = styled.div`
  width: 700px;
  height: 400px;
  padding: 24px;
  border-radius: 3px;
  background: #fff;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 10px;
  display: flex;
  flex-direction: column;
`;

const FeaturesBox = styled.div`
  display: flex;
  align-items: center;
  margin: 8px 0;

  > div:not(:last-child) {
    margin-right: 16px;
  }
`;

const IconButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const TagsBox = styled.div`
  display: flex;
  margin-bottom: 16px;

  > div {
    margin-right: 8px;
  }
`;

const FavoriteBox = styled.div`
  display: flex;
  align-items: center;
  margin-right: 12px;
`;

const FeaturesBoxLeft = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`;

const FeaturesBoxRight = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  justify-content: flex-end;
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

const menuItems: Array<MenuItem> = [
  {
    icon: "file_copy",
    label: "copy",
    onClick: () => null,
  },
  {
    icon: "share",
    label: "share",
    onClick: () => null,
  },
  {
    icon: "edit",
    label: "edit",
    onClick: () => null,
  },
  {
    icon: "trash",
    label: "delete",
    onClick: () => null,
  },
];

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
      <T12>
        <a>{palette.authorId}</a>
      </T12>
      <FeaturesBox>
        <FeaturesBoxLeft>
          <Favorite isFavorited={false} count={12} />
          <IconButton
            color="secondary"
            size="small"
            iconName={palette.private ? "lock" : "lock_open"}
          />
        </FeaturesBoxLeft>
        <FeaturesBoxRight>
          <AnchoredMenu
            toggleIcon="more_vert"
            menuItems={menuItems}
            size="small"
          />
        </FeaturesBoxRight>
      </FeaturesBox>
      <TagsBox>
        {palette.tags.map(tag => (
          <Chip key={tag.key} label={tag.name} size="small" color="secondary" />
        ))}
      </TagsBox>
      <PaletteTemplate palette={palette} enableColorDetails />
    </PaletteOverviewCardBox>
  );
};
