import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import React from "react";
import { Field, useField } from "react-final-form";
import { IconButton } from "src/design/IconButton";
import { Text } from "src/design/Text";
import { fieldNames } from "src/paletteCreator/paletteCreator.constants";
import styled, { css } from "styled-components";
import {
  SectionHeader,
  SubSectionBox,
  SectionBox,
} from "src/paletteCreator/paletteCreator.styles";
import { GutterSize, Gutters, makeGutters } from "src/design/design.helpers";
import { isFalsy } from "src/shared/shared.typeGuards";

type Props = {};

const useSidebarDetails = (props: Props) => {
  const privateField = useField(fieldNames.private);
  const isPrivate = privateField.input.value;

  const privateLabel = isPrivate ? "Private" : "Public";
  const privateIcon = isPrivate ? "lock" : "lock_open";

  return {
    isPrivate,
    privateLabel,
    privateIcon,
  };
};

export const SidebarDetails = (props: Props) => {
  const state = useSidebarDetails(props);

  return (
    <CardContent>
      <SectionHeader>Details</SectionHeader>
      <SectionBox>
        <SubSectionBox>
          <Field<string> name={fieldNames.name} key={fieldNames.name}>
            {({ input, meta }) => {
              return (
                <TextField
                  label="Name"
                  variant="outlined"
                  value={input.value}
                  onChange={e => input.onChange(e.target.value)}
                  size="small"
                  helperText={meta.touched ? meta.error : ""}
                  error={meta.touched && !isFalsy(meta.error)}
                  fullWidth
                />
              );
            }}
          </Field>
        </SubSectionBox>
        <SubSectionBox>
          <Field<string>
            name={fieldNames.description}
            key={fieldNames.description}
          >
            {({ input, meta }) => {
              return (
                <TextField
                  label="Description"
                  variant="outlined"
                  multiline
                  rows="3"
                  value={input.value}
                  onChange={e => input.onChange(e.target.value)}
                  size="small"
                  helperText={meta.touched ? meta.error : ""}
                  error={meta.touched && !isFalsy(meta.error)}
                  fullWidth
                />
              );
            }}
          </Field>
        </SubSectionBox>
        <SubSectionBox>
          <Field<boolean> name={fieldNames.private} key={fieldNames.private}>
            {({ input, meta }) => (
              <IconButton
                iconName={state.privateIcon}
                onClick={() => input.onChange(!input.value)}
                label={state.privateLabel}
                size="small"
              />
            )}
          </Field>
        </SubSectionBox>
      </SectionBox>
    </CardContent>
  );
};
