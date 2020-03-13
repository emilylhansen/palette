import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import React from "react";
import { Field, useField } from "react-final-form";
import { IconButton } from "src/design/IconButton";
import { Text } from "src/design/Text";
import { fieldNames } from "src/paletteCreator/paletteCreator.constants";
import { SidebarFavorites } from "src/paletteCreator/SidebarFavorites";
import { SidebarTags } from "src/paletteCreator/SidebarTags";
import styled, { css } from "styled-components";

const overrides = {
  privateButton: css`
    margin-right: 16px;
  `,
};

const PaletteCreatorSidebarBox = styled.div`
  width: 300px;
  margin-right: 32px;
  display: flex;

  > div:first-child {
    overflow: auto;
    width: 100%;
  }
`;

const PrivateBox = styled.div`
  display: flex;
  align-items: center;
`;

const SectionBox = styled.div`
  margin-bottom: 8px;
`;

type Props = {};

const usePaletteCreatorSidebar = (props: Props) => {
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

export const PaletteCreatorSidebar = (props: Props) => {
  const state = usePaletteCreatorSidebar(props);

  return (
    <PaletteCreatorSidebarBox>
      <Card>
        <CardContent>
          <Text variant="body1" gutterBottom={"small"}>
            Details
          </Text>
          <SectionBox>
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
                    error={meta.touched && meta.error !== ""}
                  />
                );
              }}
            </Field>
          </SectionBox>
          <SectionBox>
            <Field<string>
              name={fieldNames.description}
              key={fieldNames.description}
            >
              {({ input, meta }) => (
                <TextField
                  label="Description"
                  variant="outlined"
                  multiline
                  rows="3"
                  value={input.value}
                  onChange={e => input.onChange(e.target.value)}
                  size="small"
                  helperText={meta.touched ? meta.error : ""}
                  error={meta.touched && meta.error !== ""}
                />
              )}
            </Field>
          </SectionBox>
          <SectionBox>
            <Field<boolean> name={fieldNames.private} key={fieldNames.private}>
              {({ input, meta }) => (
                <PrivateBox>
                  <IconButton
                    iconName={state.privateIcon}
                    onClick={() => input.onChange(!input.value)}
                    cssOverrides={overrides.privateButton}
                  />
                  <Text variant="body1">{state.privateLabel}</Text>
                </PrivateBox>
              )}
            </Field>
          </SectionBox>
        </CardContent>
        <Divider variant="middle" />
        <SidebarTags />
        <Divider variant="middle" />
        <SidebarFavorites />
      </Card>
    </PaletteCreatorSidebarBox>
  );
};
