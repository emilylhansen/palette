import React from "react";
import { connect, ConnectedProps, Provider } from "react-redux";
import { createStore, Dispatch } from "redux";
import styled, { css, FlattenSimpleInterpolation } from "styled-components";
import {
  T10,
  T12,
  T24,
} from "/Users/emilyhansen/Desktop/palette-app/src/design/Text";
import {
  Palette,
  Color,
} from "/Users/emilyhansen/Desktop/palette-app/src/root/root.types";
import { Icon } from "/Users/emilyhansen/Desktop/palette-app/src/design/Icon";
import convert from "color-convert";
import { convertHexToRGBA } from "/Users/emilyhansen/Desktop/palette-app/src/shared/shared.helpers";
import { isNull } from "/Users/emilyhansen/Desktop/palette-app/src/shared/shared.typeGuards";

const PaletteTemplateBox = styled.div<{ css?: FlattenSimpleInterpolation }>`
  display: flex;
  flex: 1;

  ${({ css: css_ }) =>
    css`
      ${css_}
    `}
`;

const ColorBlockBox = styled.div<{
  hex: Color["hex"];
  enableColorDetails?: boolean;
}>`
  ${({ hex, enableColorDetails }) => css`
    background: #${hex};

    ${!isNull(enableColorDetails) &&
      css`
        :hover {
          background: ${convertHexToRGBA({ hex, opacity: 0.3 })};

          > div,
          i {
            display: block;
          }
        }
      `}
  `}

  flex: 1;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 16px;

  > div,
  i {
    display: none;
  }

  > div {
    text-align: center;
  }
`;

type PassedProps = {
  palette: Palette;
  enableColorDetails?: boolean;
  css?: FlattenSimpleInterpolation;
};
type InjectedProps = {};
type Props = PassedProps & InjectedProps;

export const PaletteTemplate = ({
  palette,
  enableColorDetails,
  css: css_,
}: Props) => {
  return (
    <PaletteTemplateBox css={css_}>
      {palette.colors.map((color: Color) => (
        <ColorBlockBox hex={color.hex} enableColorDetails={enableColorDetails}>
          {enableColorDetails && (
            <>
              <T12>{color.name}</T12>
              <T10>{`#${color.hex}`}</T10>
              <Icon iconName={true ? "favorite" : "favorite_border"} />
            </>
          )}
        </ColorBlockBox>
      ))}
    </PaletteTemplateBox>
  );
};
