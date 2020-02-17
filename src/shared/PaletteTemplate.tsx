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
import { isNil } from "/Users/emilyhansen/Desktop/palette-app/src/shared/shared.typeGuards";
import { IconButton } from "/Users/emilyhansen/Desktop/palette-app/src/design/IconButton";

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

    ${!isNil(enableColorDetails) &&
      css`
        :hover {
          background: ${convertHexToRGBA({ hex, opacity: 0.3 })};

          > div,
          i {
            display: flex;
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

const ActionsBox = styled.div`
  display: flex;
  margin-top: 8px;
`;

export type ColorAction = {
  iconName: string;
  onClick: () => void;
};

type PassedProps = {
  palette: Palette;
  enableColorDetails?: boolean;
  css?: FlattenSimpleInterpolation;
  actions?: Array<ColorAction>;
};
type InjectedProps = {};
type Props = PassedProps & InjectedProps;
{
  /* <IconButton
                  iconName={true ? "favorite" : "favorite_border"}
                  size="small"
                />
                <IconButton iconName="file_copy" size="small" /> */
}
export const PaletteTemplate = ({
  palette,
  enableColorDetails,
  css: css_,
  actions,
}: Props) => {
  return (
    <PaletteTemplateBox css={css_}>
      {palette.colors.map((color: Color) => (
        <ColorBlockBox hex={color.hex} enableColorDetails={enableColorDetails}>
          {enableColorDetails && (
            <>
              <T12>{color.name}</T12>
              <T10>{`#${color.hex}`}</T10>
            </>
          )}
          {!isNil(actions) && (
            <ActionsBox>
              {actions.map((action, i) => (
                <IconButton
                  key={i}
                  iconName={action.iconName}
                  onClick={action.onClick}
                  size="small"
                />
              ))}
            </ActionsBox>
          )}
        </ColorBlockBox>
      ))}
    </PaletteTemplateBox>
  );
};
