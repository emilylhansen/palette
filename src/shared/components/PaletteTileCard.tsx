import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Text } from "src/design/Text";
import { styled } from "src/root/root.theme";
import { CopyButton } from "src/shared/components/CopyButton";
import { FavoriteButton } from "src/shared/components/FavoriteButton";
import { PaletteTemplate } from "src/shared/components/PaletteTemplate";
import { handleOnFavoritePalette as handleOnFavoritePaletteAction } from "src/shared/shared.actions";
import { makeCopyValue } from "src/shared/shared.helpers";
import { isPaletteFavorited } from "src/shared/shared.selectors";
import { Palette } from "src/shared/shared.types";
import { css } from "styled-components";

export const MIN_WIDTH = 280;

export const MIN_HEIGHT = 280;

const cssOverrides = {
  favoriteButton: css`
    margin-right: 8px;
  `,
};

const DetailsBox = styled.div`
  position: relative;
  justify-content: center;
  height: 100%;
  align-items: center;
  display: flex;
  flex-direction: column;
  opacity: 0;
  transition: opacity 0.5s;
`;

const FeaturesItemBox = styled.div``;

const FeaturesBox = styled.div`
  display: flex;
  margin-top: 8px;

  > ${FeaturesItemBox}:not(:last-child) {
    margin-right: 8px;
  }
`;

const PaletteTemplateBox = styled.div`
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  position: absolute;
  opacity: 1;
  transition: opacity 0.5s;
  border: 16px solid #fff;
  box-sizing: border-box;
  border-radius: 6px;
`;

const PaletteTileCardBox = styled.div<{ onClick: () => void }>`
  position: relative;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  display: flex;
  min-width: ${MIN_WIDTH}px;
  width: 100%;
  min-height: ${MIN_HEIGHT}px;
  height: 100%;
  border-radius: 6px;

  :hover {
    ${DetailsBox} {
      opacity: 1;
    }

    ${PaletteTemplateBox} {
      opacity: 0.2;
    }
  }

  ${({ theme }) => css`
    box-shadow: ${theme.defaultMui.shadows[2]};
  `}
`;

type Props = { palette: Palette; onClick: () => void };

const usePaletteTileCard = ({ palette }: Props) => {
  const dispatch = useDispatch();

  const isFavorited = useSelector(isPaletteFavorited(palette.key));

  const copyValue = makeCopyValue(palette.colors);

  const handleOnFavoritePalette = () =>
    dispatch(
      handleOnFavoritePaletteAction({
        isFavorited: isFavorited,
        paletteKey: palette.key,
      })
    );

  return { isFavorited, copyValue, handleOnFavoritePalette };
};

export const PaletteTileCard = (props: Props) => {
  const state = usePaletteTileCard(props);

  return (
    <PaletteTileCardBox onClick={props.onClick}>
      <PaletteTemplateBox>
        <PaletteTemplate colors={props.palette.colors} />
      </PaletteTemplateBox>
      <DetailsBox>
        <Text variant="subtitle2" align="center" fontWeight={500}>
          {props.palette.name}
        </Text>
        <FeaturesBox>
          <FavoriteButton
            isFavorited={state.isFavorited}
            cssOverrides={cssOverrides.favoriteButton}
            onClick={e => {
              e.stopPropagation();

              state.handleOnFavoritePalette();
            }}
          />
          <CopyButton value={state.copyValue} />
        </FeaturesBox>
      </DetailsBox>
    </PaletteTileCardBox>
  );
};
