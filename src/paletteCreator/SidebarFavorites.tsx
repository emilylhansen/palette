import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setDescription,
  setName,
  setPrivate,
} from "src/paletteCreator/paletteCreator.actions";
import {
  getDescription,
  getName,
  getPrivate,
  getFavoriteColorsById,
} from "src/paletteCreator/paletteCreator.selectors";
import { SidebarTags } from "src/paletteCreator/SidebarTags";
import styled, { css } from "styled-components";
import { IconButton } from "src/design/IconButton";
import { Text } from "src/design/Text";
import { getFavoriteColorIds } from "src/shared/shared.selectors";

const overrides = {
  add: css`
    display: none;
  `,
};

const FavoritesBox = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const ColorBox = styled.div<{ hex: string }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin: auto 8px 8px 0;
  display: flex;
  align-items: center;
  justify-content: center;

  :hover {
    > div {
      display: block;
    }
  }

  ${({ hex }) => css`
    background-color: #${hex};
  `}
`;

type Props = { handleOnAddColor: (hex: string) => void };

const useSidebarFavorites = (props: Props) => {
  const favoriteColorsByIds = useSelector(getFavoriteColorsById);

  return { favoriteColorsByIds };
};

export const SidebarFavorites = (props: Props) => {
  const state = useSidebarFavorites(props);

  return (
    <CardContent>
      <Typography gutterBottom variant="h5" component="h2">
        Favorites
      </Typography>
      <FavoritesBox>
        {Object.values(state.favoriteColorsByIds).map(f => (
          <ColorBox hex={f.hex} key={f.key}>
            <IconButton
              iconName="add"
              css={overrides.add}
              size="small"
              color="default"
              onClick={() => props.handleOnAddColor(f.hex)}
            />
          </ColorBox>
        ))}
      </FavoritesBox>
    </CardContent>
  );
};
