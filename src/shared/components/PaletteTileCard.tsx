import React from "react";
import { css } from "styled-components";
import { Text } from "src/design/Text";
import { Palette } from "src/shared/shared.types";
import { PaletteTemplate } from "src/shared/components/PaletteTemplate";
import { IconButton } from "src/design/IconButton";
import { styled } from "src/root/root.theme";
import { FavoriteButton } from "src/shared/components/FavoriteButton";

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
  transition: opacity 0.3s;
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

  > button {
    position: absolute;
    top: -24px;
    left: -24px;
  }

  ${DetailsBox}, button {
    display: none;
  }

  :hover {
    ${DetailsBox}, button {
      display: inline-flex;
    }

    ${PaletteTemplateBox} {
      opacity: 0.5;
    }
  }
`;

type Props = { palette: Palette; onClick: () => void };

export const PaletteTileCard = ({ palette, onClick }: Props) => {
  return (
    <PaletteTileCardBox onClick={onClick}>
      <PaletteTemplateBox>
        <PaletteTemplate colors={palette.colors} />
      </PaletteTemplateBox>
      <DetailsBox>
        <Text variant="body1" align="center">
          {palette.name}
        </Text>
        <FeaturesBox>
          <FavoriteButton
            isFavorited={true}
            cssOverrides={cssOverrides.favoriteButton}
          />
          <IconButton iconName={"file_copy"} />
        </FeaturesBox>
      </DetailsBox>
    </PaletteTileCardBox>
  );
};
