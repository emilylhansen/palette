import Chip from "@material-ui/core/Chip";
import { getOrElse, map } from "fp-ts/lib/Option";
import { pipe } from "fp-ts/lib/pipeable";
import { lookup } from "fp-ts/lib/Record";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IconButton } from "src/design/IconButton";
import { Text } from "src/design/Text";
import { styled } from "src/root/root.theme";
import { CopyButton } from "src/shared/components/CopyButton";
import { FavoriteButton } from "src/shared/components/FavoriteButton";
import {
  ColorAction,
  PaletteTemplate,
} from "src/shared/components/PaletteTemplate";
import {
  handleOnFavoriteColor as handleOnFavoriteColorAction,
  handleOnFavoritePalette as handleOnFavoritePaletteAction,
  privatePalette,
} from "src/shared/shared.actions";
import { makeCopyValue } from "src/shared/shared.helpers";
import {
  getUsersById,
  isColorFavorited as isColorFavoritedSelector,
  isCurrentUsersPalette as isCurrentUsersPaletteSelector,
  isPaletteFavorited as isPaletteFavoritedSelector,
  getFavoriteColorIds,
} from "src/shared/shared.selectors";
import { Palette } from "src/shared/shared.types";
import {
  failure,
  fold,
  initial,
  pending,
  RemoteData,
  success,
  exists as remoteExists,
} from "@devexperts/remote-data-ts";

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
  handleOnFavoriteColor,
  isColorFavorited,
}: {
  handleOnFavoriteColor: (colorKey: string) => void;
  isColorFavorited: (colorKey: string) => boolean;
}): Array<ColorAction> => [
  {
    custom: ({ color }) => (
      <FavoriteButton
        isFavorited={isColorFavorited(color.key)}
        onClick={() => handleOnFavoriteColor(color.key)}
      />
    ),
  },
  {
    custom: ({ color }) => <CopyButton value={color.hex} />,
  },
];

type Props = { palette: Palette };

const usePaletteOverviewCard = ({ palette }: Props) => {
  const dispatch = useDispatch();

  const usersById = useSelector(getUsersById);
  const isPaletteFavorited = useSelector(
    isPaletteFavoritedSelector(palette.key)
  );
  const favoriteColorIds = useSelector(getFavoriteColorIds);

  const isCurrentUsersPalette = useSelector(isCurrentUsersPaletteSelector);

  const author = lookup(palette.authorId, usersById);

  const copyValue = makeCopyValue(palette.colors);

  const handleOnFavoritePalette = () =>
    dispatch(
      handleOnFavoritePaletteAction({
        isFavorited: isPaletteFavorited,
        paletteKey: palette.key,
      })
    );

  const isColorFavorited = (colorKey: string) =>
    remoteExists<Array<string>>(favoriteColorIds_ =>
      favoriteColorIds_.includes(colorKey)
    )(favoriteColorIds);

  const handleOnFavoriteColor = (colorKey: string) => {
    dispatch(
      handleOnFavoriteColorAction({
        isFavorited: isColorFavorited(colorKey),
        colorKey,
      })
    );
  };

  const handleOnPrivatePalette = () =>
    dispatch(
      privatePalette({ isPrivate: !palette.private, paletteKey: palette.key })
    );

  const privateIconName = palette.private ? "lock" : "lock_open";

  const paletteTemplateActions = makeActions({
    handleOnFavoriteColor,
    isColorFavorited,
  });

  return {
    isPaletteFavorited,
    isCurrentUsersPalette,
    author,
    copyValue,
    handleOnFavoritePalette,
    handleOnPrivatePalette,
    privateIconName,
    paletteTemplateActions,
  };
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
        {state.isCurrentUsersPalette && (
          <FeaturesItemBox>
            <FavoriteButton
              isFavorited={state.isPaletteFavorited}
              // count={12}
              onClick={state.handleOnFavoritePalette}
            />
          </FeaturesItemBox>
        )}
        <FeaturesItemBox>
          <IconButton
            color="secondary"
            iconName={state.privateIconName}
            onClick={state.handleOnPrivatePalette}
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
      <PaletteTemplate
        colors={props.palette.colors}
        enableColorDetails
        actions={state.paletteTemplateActions}
      />
    </PaletteOverviewCardBox>
  );
};
