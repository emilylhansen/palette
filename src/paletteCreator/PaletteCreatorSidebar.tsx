import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setDescription,
  setName,
  setPrivate,
} from "src/paletteCreator/paletteCreator.actions";
import {
  getDescription,
  getName,
  getPrivate,
} from "src/paletteCreator/paletteCreator.selectors";
import { SidebarTags } from "src/paletteCreator/SidebarTags";
import { SidebarFavorites } from "src/paletteCreator/SidebarFavorites";
import styled, { css } from "styled-components";
import { IconButton } from "src/design/IconButton";
import { Text } from "src/design/Text";
import { Form, Field, useField } from "react-final-form";
import { fieldNames } from "src/paletteCreator/paletteCreator.constants";

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

type Props = { handleOnAddColor: (hex: string) => void };

const usePaletteCreatorSidebar = (props: Props) => {
  const dispatch = useDispatch();

  const name = useSelector(getName);
  const description = useSelector(getDescription);
  const isPrivate = useSelector(getPrivate);

  const privateLabel = isPrivate ? "Private" : "Public";
  const privateIcon = isPrivate ? "lock" : "lock_open";

  const onChangeName = (value: string) => dispatch(setName(value));

  const onChangeDescription = (value: string) =>
    dispatch(setDescription(value));

  const onTogglePrivate = () => dispatch(setPrivate(!isPrivate));

  const nameField = useField(fieldNames.name);

  return {
    name,
    description,
    isPrivate,
    privateLabel,
    privateIcon,
    onChangeName,
    onChangeDescription,
    onTogglePrivate,
  };
};

export const PaletteCreatorSidebar = (props: Props) => {
  const state = usePaletteCreatorSidebar(props);

  return (
    <PaletteCreatorSidebarBox>
      <Card>
        <CardContent>
          <Text fontSize={16} gutterBottom>
            Details
          </Text>
          <SectionBox>
            <Field<string>
              name={fieldNames.name}
              key={fieldNames.name}
              component={({ input, meta }) => {
                return (
                  <TextField
                    label="Name"
                    variant="outlined"
                    value={input.value}
                    onChange={e => input.onChange(e.target.value)}
                    size="small"
                    helperText={meta.touched ? meta.error : ""}
                    error={meta.error !== ""}
                  />
                );
              }}
            />
          </SectionBox>
          <SectionBox>
            <Field<string>
              name={fieldNames.description}
              key={fieldNames.description}
              component={({ input, meta }) => (
                <TextField
                  label="Description"
                  variant="outlined"
                  multiline
                  rows="3"
                  // value={state.description}
                  // onChange={e => state.onChangeDescription(e.target.value)}
                  value={input.value}
                  onChange={e => input.onChange(e.target.value)}
                  size="small"
                  helperText={meta.touched ? meta.error : ""}
                  error={meta.error !== ""}
                />
              )}
            />
          </SectionBox>
          <SectionBox>
            <PrivateBox>
              <IconButton
                iconName={state.privateIcon}
                onClick={state.onTogglePrivate}
                css={overrides.privateButton}
              />
              <Text fontSize={14}>{state.privateLabel}</Text>
            </PrivateBox>
          </SectionBox>
        </CardContent>
        <Divider variant="middle" />
        <SidebarTags />
        <Divider variant="middle" />
        <SidebarFavorites handleOnAddColor={props.handleOnAddColor} />
      </Card>
    </PaletteCreatorSidebarBox>
  );
};
