import React from "react";
import styled, { css } from "styled-components";
import { T24 } from "src/design/Text";
import { Palette } from "src/shared/shared.types";
import { PaletteTemplate } from "src/shared/PaletteTemplate";
import { IconButton } from "src/design/IconButton";

const overrides = {
  paletteTemplate: css`
    right: 0;
    left: 0;
    top: 0;
    bottom: 0;
    position: absolute;
  `,
  button: css`
    position: absolute;
  `,
  name: css`
    text-align: center;
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

const PaletteTileCardBox = styled.div<{ onClick: () => void }>`
  width: 300px;
  height: 200px;
  padding: 32px;
  position: relative;
  cursor: pointer;

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
  }
`;

type PassedProps = { palette: Palette; onClick: () => void };
type InjectedProps = {};
type Props = PassedProps & InjectedProps;

export const PaletteTileCard = ({ palette, onClick }: Props) => {
  return (
    <PaletteTileCardBox onClick={onClick}>
      <PaletteTemplate palette={palette} css={overrides.paletteTemplate} />
      <DetailsBox>
        <T24 css={overrides.name}>{palette.name}</T24>
        <FeaturesBox>
          <IconButton iconName={true ? "favorite" : "favorite_border"} />
          <IconButton iconName={"file_copy"} />
        </FeaturesBox>
      </DetailsBox>
    </PaletteTileCardBox>
  );
};
