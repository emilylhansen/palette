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
import { css } from "styled-components";
import { Text } from "src/design/Text";
import Paper from "@material-ui/core/Paper";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { styled, Theme } from "src/root/root.theme";
import { Medias } from "src/root/root.styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flex: 1,
    },
  })
);

const PaletteCreatorPaletteBox = styled.div`
  flex: 1;
  display: flex;
  // margin: 56px 32px;
`;

const AddBox = styled.div`
  display: flex;
  align-items: center;
  margin-left: 16px;
`;

const PaletteTemplateBox = styled.div<{ hasError: boolean; isEmpty: boolean }>`
  // border: 1px dashed;
  flex: 1;
  border-radius: 6px;
  justify-content: center;
  align-items: center;
  display: flex;
  height: 100%;
  box-sizing: border-box;

  @media (max-width: ${Medias.EXTRA_SMALL.maxWidth}px) {
    padding: ${Medias.EXTRA_SMALL.margins}px;
  }

  @media (min-width: ${Medias.SMALL.minWidth}px) {
    padding: ${Medias.SMALL.margins}px;
  }

  @media (min-width: ${Medias.MEDIUM.minWidth}px) {
    padding: ${Medias.MEDIUM.margins}px;
  }

  @media (min-width: ${Medias.LARGE.minWidth}px) {
    padding: ${Medias.LARGE.margins}px;
  }

  @media (min-width: ${Medias.EXTRA_LARGE.minWidth}px) {
    padding: ${Medias.EXTRA_LARGE.margins}px;
  }

  ${({ hasError, isEmpty }) => css`
    border: ${hasError ? "1px dashed red" : isEmpty ? "1px dashed" : "none"};
  `};
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

  const classes = useStyles();

  return {
    colorsField,
    classes,
  };
};

export const PaletteCreatorPalette = (props: Props) => {
  const state = usePaletteCreatorPalette(props);

  return (
    <PaletteCreatorPaletteBox>
      <Field<Array<Color>> name={fieldNames.colors} key={fieldNames.colors}>
        {({ input, meta }) => {
          const isEmptyPalette = isEmptyArray(input.value);

          return (
            <Paper className={state.classes.root}>
              <PaletteTemplateBox
                isEmpty={isEmptyPalette}
                hasError={meta.touched && meta.error !== ""}
              >
                {isEmptyPalette ? (
                  <Text variant="subtitle2" align="center">
                    Add colors to your palette by using the + button.
                  </Text>
                ) : (
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
                )}
              </PaletteTemplateBox>
            </Paper>
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
