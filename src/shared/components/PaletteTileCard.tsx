import React from "react";
import { css } from "styled-components";
import { Text } from "src/design/Text";
import { Palette } from "src/shared/shared.types";
import { PaletteTemplate } from "src/shared/components/PaletteTemplate";
import { IconButton } from "src/design/IconButton";
import { styled } from "src/root/root.theme";
import { FavoriteButton } from "src/shared/components/FavoriteButton";
import { CopyButton } from "src/shared/components/CopyButton";
import { makeCopyValue } from "src/shared/shared.helpers";

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

const FeaturesBox = styled.div`
  display: flex;
  margin-top: 8px;
`;

const PaletteTemplateBox = styled.div`
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  position: absolute;
  opacity: 1;
  transition: opacity 0.5s;
`;

const PaletteTileCardBox = styled.div<{ onClick: () => void }>`
  width: 300px;
  height: 200px;
  padding: 32px;
  position: relative;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  display: flex;

  :hover {
    ${DetailsBox} {
      opacity: 1;
    }

    ${PaletteTemplateBox} {
      opacity: 0.2;
    }
  }
`;

type Props = { palette: Palette; onClick: () => void };

const usePaletteTileCard = (props: Props) => {
  const copyValue = makeCopyValue(props.palette.colors);

  return { copyValue };
};

export const PaletteTileCard = (props: Props) => {
  const state = usePaletteTileCard(props);

  return (
    <PaletteTileCardBox onClick={props.onClick}>
      <PaletteTemplateBox>
        <PaletteTemplate colors={props.palette.colors} />
      </PaletteTemplateBox>
      <DetailsBox>
        <Text variant="body1" align="center">
          {props.palette.name}
        </Text>
        <FeaturesBox>
          <FavoriteButton
            isFavorited={true}
            cssOverrides={cssOverrides.favoriteButton}
          />
          <CopyButton value={state.copyValue} />
        </FeaturesBox>
      </DetailsBox>
    </PaletteTileCardBox>
  );
};
