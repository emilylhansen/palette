import React, { ReactNode } from "react";
import styled, { css, FlattenSimpleInterpolation } from "styled-components";
import { Text } from "src/design/Text";
import { Color } from "src/shared/shared.types";
import { isNil } from "src/shared/shared.typeGuards";
import { IconButton } from "src/design/IconButton";
import { ColorPicker } from "src/shared/components/ColorPicker";

const PaletteTemplateBox = styled.div<{
  cssOverrides?: FlattenSimpleInterpolation;
}>`
  display: flex;
  flex: 1;
  height: 100%;
  border-radius: 6px;
  overflow: hidden;

  ${({ cssOverrides }) =>
    css`
      ${cssOverrides}
    `}
`;

const ColorBlockBox = styled.div<{ enableColorDetails?: boolean }>`
  flex: 1;
  position: relative;

  ${({ enableColorDetails }) => css`
    ${!isNil(enableColorDetails) &&
      css`
        :hover {
          ${ColorDetailsBox} {
            opacity: 1;
          }

          ${ColorBox} {
            opacity: 0.2;
          }
        }
      `};
  `}
`;

const ColorDetailsBox = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  opacity: 0;
  transition: opacity 0.5s;
`;

const ColorBox = styled.div<{
  hex: string;
}>`
  height: 100%;
  width: 100%;
  position: absolute;
  transition: opacity 0.5s;
  opacity: 1;

  ${({ hex }) => css`
    background: ${hex};
  `}
`;

const ActionsBox = styled.div`
  display: flex;
  margin-top: 8px;
`;

const ColorPickerBox = styled.div`
  flex: 1;
`;

const ColorBlock = ({
  color,
  enableColorDetails,
  actions,
  onClick,
}: {
  color: Color;
  enableColorDetails: boolean;
  actions?: Array<ColorAction>;
  onClick?: () => void;
}) => {
  return (
    <ColorBlockBox onClick={onClick} enableColorDetails={enableColorDetails}>
      <ColorBox hex={color.hex} />
      {!isNil(enableColorDetails) && (
        <ColorDetailsBox>
          {/* <Text variant="subtitle2" align="center">
          {color.name}
        </Text> */}
          <Text variant="subtitle2">{color.hex}</Text>
          {!isNil(actions) && (
            <ActionsBox>
              {actions.map((action, i) =>
                isColorActionCustom(action) ? (
                  action.custom({ color })
                ) : (
                  <IconButton
                    key={i}
                    iconName={action.iconName}
                    onClick={e => action.onClick(e, color)}
                    size="small"
                  />
                )
              )}
            </ActionsBox>
          )}
        </ColorDetailsBox>
      )}
    </ColorBlockBox>
  );
};

const isColorActionCustom = (
  action: ColorAction
): action is ColorActionCustom => "custom" in action;

export type ColorActionStandard = {
  iconName: string;
  onClick: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    color: Color
  ) => void;
};

export type ColorActionCustom = {
  custom: ({ color }: { color: Color }) => ReactNode;
};

export type ColorAction = ColorActionStandard | ColorActionCustom;

type Props = {
  colors: Array<Color>;
  enableColorDetails?: boolean;
  cssOverrides?: FlattenSimpleInterpolation;
  actions?: Array<ColorAction>;
  handleColor?: ({ key, hex }: { key: string; hex: string }) => void;
};

const usePaletteTemplate = (props: Props) => {
  const isColorPickerEnabled = !isNil(props.handleColor);

  return { isColorPickerEnabled };
};

export const PaletteTemplate = (props: Props) => {
  const state = usePaletteTemplate(props);

  return (
    <PaletteTemplateBox cssOverrides={props.cssOverrides}>
      {props.colors.map((color: Color, idx: number) => {
        return state.isColorPickerEnabled ? (
          <ColorPickerBox key={`${color.key}-${idx}`}>
            <ColorPicker
              color={color.hex}
              toggle={({ onToggle, isOpen }) => (
                <ColorBlock
                  key={`${color.key}-${idx}`}
                  color={color}
                  enableColorDetails={props.enableColorDetails}
                  actions={props.actions}
                  onClick={onToggle}
                />
              )}
              handleColor={hex => props.handleColor({ key: color.key, hex })}
            />
          </ColorPickerBox>
        ) : (
          <ColorBlock
            key={`${color.key}-${idx}`}
            color={color}
            enableColorDetails={props.enableColorDetails}
            actions={props.actions}
          />
        );
      })}
    </PaletteTemplateBox>
  );
};
