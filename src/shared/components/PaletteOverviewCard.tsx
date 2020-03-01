import React from "react";
import {
  connect,
  ConnectedProps,
  Provider,
  useDispatch,
  useSelector,
} from "react-redux";
import { createStore, Dispatch } from "redux";
import styled, { css } from "styled-components";
import { Text } from "src/design/Text";
import { Palette } from "src/shared/shared.types";
import { Icon } from "src/design/Icon";
import {
  PaletteTemplate,
  ColorAction,
} from "src/shared/components/PaletteTemplate";
import { IconButton } from "src/design/IconButton";
import Chip from "@material-ui/core/Chip";
import { AnchoredMenu, MenuItem } from "src/design/AnchoredMenu";
import {
  makeHomeRoute,
  makeAboutRoute,
  makeCreateRoute,
  makeEditRoute,
  makeSettingsRoute,
} from "src/root/root.routes";
import { history } from "src/App";
import {
  getPalettesById,
  getColorsById,
  getUsersById,
} from "src/shared/shared.selectors";
import { lookup } from "fp-ts/lib/Record";
import { pipe } from "fp-ts/lib/pipeable";
import { fold, map, getOrElse } from "fp-ts/lib/Option";

const overrides = {
  favorite: css`
    margin-right: 4px;
  `,
};

const PaletteOverviewCardBox = styled.div`
  padding: 0 24px 24px;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const FeaturesBox = styled.div`
  display: flex;
  align-items: center;
  margin: 8px 0;

  > div:not(:last-child) {
    margin-right: 16px;
  }
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
    <Text fontSize={12}>{count}</Text>
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
    onClick: () => history.push(makeEditRoute()),
  },
  {
    icon: "trash",
    label: "delete",
    onClick: () => null,
  },
];

type Props = { palette: Palette };

export const PaletteOverviewCard = ({ palette }: Props) => {
  const usersById = useSelector(getUsersById);
  const author = lookup(palette.authorId, usersById);

  return (
    <PaletteOverviewCardBox>
      <Text fontSize={24}>{palette.name}</Text>
      <Text fontSize={12}>
        {pipe(
          author,
          map(author_ => author_.name),
          getOrElse(() => "N/A")
        )}
      </Text>
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
          <Chip
            key={tag.key}
            label={tag.value}
            size="small"
            color="secondary"
          />
        ))}
      </TagsBox>
      <PaletteTemplate colors={palette.colors} enableColorDetails />
    </PaletteOverviewCardBox>
  );
};
