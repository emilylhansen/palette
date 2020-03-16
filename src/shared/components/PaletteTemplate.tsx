import React from "react";
import styled, { css, FlattenSimpleInterpolation } from "styled-components";
import { Text } from "src/design/Text";
import { Color } from "src/shared/shared.types";
import { convertHexToRGBA } from "src/shared/shared.helpers";
import { isNil } from "src/shared/shared.typeGuards";
import { IconButton } from "src/design/IconButton";
import { ColorPicker } from "src/shared/components/ColorPicker";
import { pipe } from "fp-ts/lib/pipeable";
import { Option, some, none, isSome } from "fp-ts/lib/Option";

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

const colorBlockStyles = css`
  flex: 1;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 16px;
`;

const ColorBlockErrorBox = styled.div`
  ${colorBlockStyles}
`;

const ColorBlockBox = styled.div<{
  rgbaSheer: string;
  rgbaOpaque: string;
  enableColorDetails?: boolean;
  hex: string;
}>`
  flex: 1;
  ${colorBlockStyles}

  ${({ rgbaSheer, rgbaOpaque, enableColorDetails, hex }) => css`
    background: #${hex};

    ${!isNil(enableColorDetails) &&
      css`
        transition: background 0.3s, opacity 0.3s;

        * {
          opacity: 0;
        }

        :hover {
          * {
            opacity: 1;
          }
        }
      `};
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
  const rgbaSheer = convertHexToRGBA({ hex: color.hex, opacity: 0.2 });
  const rgbaOpaque = convertHexToRGBA({ hex: color.hex, opacity: 1 });

  return isSome(rgbaSheer) && isSome(rgbaOpaque) ? (
    <ColorBlockBox
      hex={color.hex}
      rgbaSheer={rgbaSheer.value}
      rgbaOpaque={rgbaOpaque.value}
      enableColorDetails={enableColorDetails}
      onClick={onClick}
    >
      {!isNil(enableColorDetails) && (
        <>
          {/* <Text variant="subtitle2" align="center">
          {color.name}
        </Text> */}
          <Text variant="subtitle2">{`#${color.hex}`}</Text>
          {!isNil(actions) && (
            <ActionsBox>
              {actions.map((action, i) => (
                <IconButton
                  key={i}
                  iconName={action.iconName}
                  onClick={e => action.onClick(e, color)}
                  size="small"
                />
              ))}
            </ActionsBox>
          )}
        </>
      )}
    </ColorBlockBox>
  ) : (
    <ColorBlockErrorBox>
      {/** this should throw up an error instead of displaying this text */}
      <Text variant="subtitle2">Unable to find color :(</Text>
    </ColorBlockErrorBox>
  );
};

export type ColorAction = {
  iconName: string;
  onClick: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    color: Color
  ) => void;
};

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
