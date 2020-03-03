import { isEmpty as isEmptyArray } from "fp-ts/lib/Array";
import React from "react";
import { Field, useField } from "react-final-form";
import { IconButton } from "src/design/IconButton";
import { fieldNames } from "src/paletteCreator/paletteCreator.constants";
import {
  addColorFormField,
  removeColorFormField,
  setColorFormField,
} from "src/paletteCreator/paletteCreator.helpers";
import { ColorPicker } from "src/shared/components/ColorPicker";
import {
  ColorAction,
  PaletteTemplate,
} from "src/shared/components/PaletteTemplate";
import { Color } from "src/shared/shared.types";
import styled, { css } from "styled-components";

const PaletteCreatorPaletteBox = styled.div`
  flex: 1;
  display: flex;
  margin: 56px 32px;
`;

const AddBox = styled.div`
  display: flex;
  align-items: center;
  margin-left: 16px;
`;

const PaletteTemplateBox = styled.div<{ hasError: boolean; isEmpty: boolean }>`
  border: 1px dashed;
  flex: 1;
  border-radius: 6px;

  ${({ hasError, isEmpty }) => css`
    border: ${hasError ? "1px dashed red" : isEmpty ? "1px dashed" : "none"};
  `}
`;

const makeActions = ({
  onChange,
  value,
}: {
  onChange: (colors: Array<Color>) => void;
  value: Array<Color>;
}): Array<ColorAction> => [
  {
    iconName: "cancel",
    onClick: (e, color) => {
      e.stopPropagation();

      onChange(removeColorFormField({ colors: value, key: color.key }));
    },
  },
];

type Props = {};

const usePaletteCreatorPalette = (props: Props) => {
  const colorsField = useField(fieldNames.colors);

  return {
    colorsField,
  };
};

export const PaletteCreatorPalette = (props: Props) => {
  const state = usePaletteCreatorPalette(props);

  return (
    <PaletteCreatorPaletteBox>
      <Field<Array<Color>> name={fieldNames.colors} key={fieldNames.colors}>
        {({ input, meta }) => {
          return (
            <PaletteTemplateBox
              isEmpty={isEmptyArray(input.value)}
              hasError={meta.touched && meta.error !== ""}
            >
              <PaletteTemplate
                colors={input.value}
                enableColorDetails
                actions={makeActions({
                  onChange: input.onChange,
                  value: input.value,
                })}
                handleColor={({ hex, key }) =>
                  input.onChange(
                    setColorFormField({
                      colors: input.value,
                      key,
                      hex,
                    })
                  )
                }
              />
            </PaletteTemplateBox>
          );
        }}
      </Field>
      <ColorPicker
        toggle={({ onToggle, isOpen }) => (
          <AddBox>
            <IconButton color="secondary" iconName={"add"} onClick={onToggle} />
          </AddBox>
        )}
        handleColor={(hex: string) =>
          state.colorsField.input.onChange(
            addColorFormField({
              colors: state.colorsField.input.value,
              hex,
            })
          )
        }
      />
    </PaletteCreatorPaletteBox>
  );
};
