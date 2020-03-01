import React, { useState } from "react";
import {
  connect,
  ConnectedProps,
  Provider,
  useSelector,
  useDispatch,
} from "react-redux";
import { createStore, Dispatch } from "redux";
import styled from "styled-components";
import { PaletteOverviewCard } from "src/shared/components/PaletteOverviewCard";
import { PaletteTileCard } from "src/shared/components/PaletteTileCard";
import { range } from "fp-ts/lib/Array";
import { mockPalettes } from "src/shared/mockData";
import { Overlay } from "src/design/Overlay";
import { Option, none, some, isSome, map } from "fp-ts/lib/Option";
import { Palette } from "src/shared/shared.types";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import { IconButton } from "src/design/IconButton";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import { PaletteTemplate } from "src/shared/components/PaletteTemplate";
import Chip from "@material-ui/core/Chip";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { SidebarTags } from "src/paletteCreator/SidebarTags";
import {
  getName,
  getDescription,
  getPrivate,
} from "src/paletteCreator/paletteCreator.selectors";
import {
  setName,
  setDescription,
  setPrivate,
} from "src/paletteCreator/paletteCreator.actions";

const PaletteCreatorSidebarBox = styled.div`
  width: 300px;
  margin-right: 32px;
  display: flex;

  > div:first-child {
    overflow: auto;
    width: 100%;
  }
`;

type PassedProps = {};
type InjectedProps = {};
type Props = PassedProps & InjectedProps;

const usePaletteCreatorSidebar = ({}: Props) => {
  const dispatch = useDispatch();

  const name = useSelector(getName);
  const description = useSelector(getDescription);
  const isPrivate = useSelector(getPrivate);

  const privateLabel = isPrivate ? "Private" : "Public";

  const onChangeName = (value: string) => dispatch(setName(value));

  const onChangeDescription = (value: string) =>
    dispatch(setDescription(value));

  const onTogglePrivate = () => dispatch(setPrivate(!isPrivate));

  return {
    name,
    description,
    isPrivate,
    privateLabel,
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
          <Typography gutterBottom variant="h5" component="h2">
            Details
          </Typography>
          <TextField
            label="Name"
            id="standard-size-normal"
            value={state.name}
            onChange={e => state.onChangeName(e.target.value)}
          />
          <TextField
            id="standard-multiline-static"
            label="Description"
            multiline
            rows="4"
            value={state.description}
            onChange={e => state.onChangeDescription(e.target.value)}
          />
          <FormControlLabel
            control={
              <Switch
                checked={state.isPrivate}
                onChange={state.onTogglePrivate}
              />
            }
            label={state.privateLabel}
          />
        </CardContent>
        <Divider variant="middle" />
        <SidebarTags />
        <Divider variant="middle" />
      </Card>
    </PaletteCreatorSidebarBox>
  );
};
