import Chip from "@material-ui/core/Chip";
import { getOrElse, map } from "fp-ts/lib/Option";
import { pipe } from "fp-ts/lib/pipeable";
import { lookup } from "fp-ts/lib/Record";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { AnchoredMenu, MenuItem } from "src/design/AnchoredMenu";
import { IconButton } from "src/design/IconButton";
import { Text } from "src/design/Text";
import { history } from "src/root/App";
import { makeEditRoute } from "src/root/root.routes";
import { styled } from "src/root/root.theme";
import { FavoriteButton } from "src/shared/components/FavoriteButton";
import {
  PaletteTemplate,
  ColorAction,
} from "src/shared/components/PaletteTemplate";
import {
  getColorPaletteInfo,
  getColorPalettesList,
  getColors,
  getFavoriteColorIds as getFavoriteColorIdsAction,
  getFavoritePaletteIds as getFavoritePaletteIdsAction,
  getObjectColors,
  getPalettes,
  getRandomObject,
  getUsers,
  handleOnFavorite,
} from "src/shared/shared.actions";
import {
  getColorsById,
  getFavoriteColorIds as getFavoriteColorIdsSelector,
  getFavoritePaletteIds as getFavoritePaletteIdsSelector,
  getPalettesById,
  getUsersById,
  isPaletteFavorited,
} from "src/shared/shared.selectors";
import { Palette, Color } from "src/shared/shared.types";
import { CopyButton } from "src/shared/components/CopyButton";
import { makeCopyValue } from "src/shared/shared.helpers";

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

const makeActions = ({
  onChange,
  value,
}: {
  onChange: (colors: Array<Color>) => void;
  value: Array<Color>;
}): Array<ColorAction> => [
  {
    custom: ({ onClick }) => <FavoriteButton isFavorited={false} count={12} />,
  },
];

type Props = { palette: Palette };

const usePaletteOverviewCard = ({ palette }: Props) => {
  const dispatch = useDispatch();

  const usersById = useSelector(getUsersById);
  const favoritePaletteIds = useSelector(getFavoritePaletteIdsSelector);

  const isFavorited = useSelector(isPaletteFavorited(palette.key));

  const author = lookup(palette.authorId, usersById);

  const copyValue = makeCopyValue(palette.colors);

  return { usersById, author, copyValue, isFavorited };
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
          <FavoriteButton
            isFavorited={state.isFavorited}
            count={12}
            onClick={() =>
              handleOnFavorite({
                isFavorited: state.isFavorited,
                paletteKey: props.palette.key,
              })
            }
          />
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
