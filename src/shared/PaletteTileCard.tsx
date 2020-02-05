import React from "react";
import { connect, ConnectedProps, Provider } from "react-redux";
import { createStore, Dispatch } from "redux";
import styled, { css } from "styled-components";
import {
  T12,
  T24,
} from "/Users/emilyhansen/Desktop/palette-app/src/design/Text";
import { Palette } from "/Users/emilyhansen/Desktop/palette-app/src/root/root.types";
import { Icon } from "/Users/emilyhansen/Desktop/palette-app/src/design/Icon";
import { PaletteTemplate } from "/Users/emilyhansen/Desktop/palette-app/src/shared/PaletteTemplate";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { Overlay } from "../design/Overlay";

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

const NameBox = styled.div`
  position: relative;
  justify-content: center;
  display: flex;
  height: 100%;
  align-items: center;
`;

const PaletteTileCardBox = styled.div<{ onClick: () => void }>`
  width: 300px;
  height: 200px;
  padding: 24px;
  position: relative;
  cursor: pointer;

  > button {
    position: absolute;
    top: -24px;
    left: -24px;
  }

  ${NameBox}, button {
    display: none;
  }

  :hover {
    ${NameBox}, button {
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
      <NameBox>
        <T24 css={overrides.name}>{palette.name}</T24>
      </NameBox>
      <IconButton color="secondary">
        <Icon iconName={true ? "favorite" : "favorite_border"} />
      </IconButton>
    </PaletteTileCardBox>
  );
};
