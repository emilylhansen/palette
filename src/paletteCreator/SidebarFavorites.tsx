import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { Field, useField } from "react-final-form";
import { useSelector } from "react-redux";
import { IconButton } from "src/design/IconButton";
import { fieldNames } from "src/paletteCreator/paletteCreator.constants";
import { addColorFormField } from "src/paletteCreator/paletteCreator.helpers";
import { getFavoriteColorsById } from "src/paletteCreator/paletteCreator.selectors";
import { Color } from "src/shared/shared.types";
import styled, { css } from "styled-components";
import { Text } from "src/design/Text";

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

type Props = {};

const useSidebarFavorites = (props: Props) => {
  const favoriteColorsByIds = useSelector(getFavoriteColorsById);

  const colorsField = useField(fieldNames.colors);
  const colors = colorsField.input.value;

  const onAddColor = (hex: string) =>
    colorsField.input.onChange(addColorFormField({ colors, hex }));

  return { favoriteColorsByIds, onAddColor };
};

export const SidebarFavorites = (props: Props) => {
  const state = useSidebarFavorites(props);

  return (
    <CardContent>
      <Text gutterBottom="small" variant="h5">
        Favorites
      </Text>
      <FavoritesBox>
        {Object.values(state.favoriteColorsByIds).map((f, idx) => (
          <Field<Color>
            name={`${fieldNames.favorites}-${f.key}-${idx}`}
            key={`${fieldNames.favorites}-${f.key}-${idx}`}
          >
            {({ input, meta }) => (
              <ColorBox hex={f.hex}>
                <IconButton
                  iconName="add"
                  cssOverrides={overrides.add}
                  size="small"
                  color="default"
                  onClick={() => state.onAddColor(f.hex)}
                />
              </ColorBox>
            )}
          </Field>
        ))}
      </FavoritesBox>
    </CardContent>
  );
};
