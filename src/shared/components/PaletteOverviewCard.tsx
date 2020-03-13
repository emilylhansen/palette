import Chip from "@material-ui/core/Chip";
import { getOrElse, map } from "fp-ts/lib/Option";
import { pipe } from "fp-ts/lib/pipeable";
import { lookup } from "fp-ts/lib/Record";
import React from "react";
import { useSelector } from "react-redux";
import { AnchoredMenu, MenuItem } from "src/design/AnchoredMenu";
import { IconButton } from "src/design/IconButton";
import { Text } from "src/design/Text";
import { history } from "src/root/App";
import { makeEditRoute } from "src/root/root.routes";
import { styled } from "src/root/root.theme";
import { FavoriteButton } from "src/shared/components/FavoriteButton";
import { PaletteTemplate } from "src/shared/components/PaletteTemplate";
import { getUsersById } from "src/shared/shared.selectors";
import { Palette } from "src/shared/shared.types";
import { css } from "styled-components";

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
`;

const FeaturesBoxLeft = styled.div`
  display: flex;
  align-items: center;
  flex: 1;

  > * {
    margin-right: 16px;
  }
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
    <FavoriteButton isFavorited={isFavorited} />
    <Text variant="body2" gutterLeft="small">
      {count}
    </Text>
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
      <Text variant="h6">{palette.name}</Text>
      <Text variant="body2">
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
          <IconButton color="secondary" size="small" iconName={"file_copy"} />
        </FeaturesBoxLeft>
        {/* <FeaturesBoxRight>
          <AnchoredMenu
            toggleIcon="more_vert"
            menuItems={menuItems}
            size="small"
          />
        </FeaturesBoxRight> */}
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
