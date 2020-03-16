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
import { Palette, Color } from "src/shared/shared.types";
import { CopyButton } from "src/shared/components/CopyButton";

const PaletteOverviewCardBox = styled.div`
  padding: 0 24px 24px;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const FeaturesItemBox = styled.div``;

const FeaturesBox = styled.div`
  display: flex;
  align-items: center;
  margin: 8px 0;

  > ${FeaturesItemBox}:not(:last-child) {
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

type Props = { palette: Palette };

const usePaletteOverviewCard = (props: Props) => {
  const usersById = useSelector(getUsersById);

  const author = lookup(props.palette.authorId, usersById);

  const copyValue = props.palette.colors.map(c => c.hex).join(", ");

  return { usersById, author, copyValue };
};

export const PaletteOverviewCard = (props: Props) => {
  const state = usePaletteOverviewCard(props);

  return (
    <PaletteOverviewCardBox>
      <Text variant="h6">{props.palette.name}</Text>
      <Text variant="subtitle2">
        {pipe(
          state.author,
          map(author_ => author_.name),
          getOrElse(() => "N/A")
        )}
      </Text>
      <FeaturesBox>
        <FeaturesItemBox>
          <FavoriteButton isFavorited={false} count={12} />
        </FeaturesItemBox>
        <FeaturesItemBox>
          <IconButton
            color="secondary"
            iconName={props.palette.private ? "lock" : "lock_open"}
          />
        </FeaturesItemBox>
        <FeaturesItemBox>
          <CopyButton value={state.copyValue} />
        </FeaturesItemBox>
      </FeaturesBox>
      <TagsBox>
        {props.palette.tags.map(tag => (
          <Chip key={tag.key} label={tag.value} size="small" color="primary" />
        ))}
      </TagsBox>
      <PaletteTemplate colors={props.palette.colors} enableColorDetails />
    </PaletteOverviewCardBox>
  );
};
