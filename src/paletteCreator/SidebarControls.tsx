import React, { useState } from "react";
import { connect, ConnectedProps, Provider } from "react-redux";
import { createStore, Dispatch } from "redux";
import styled from "styled-components";
import { PaletteOverviewCard } from "src/shared/PaletteOverviewCard";
import { PaletteTileCard } from "src/shared/PaletteTileCard";
import { range } from "fp-ts/lib/Array";
import { mockPalettes } from "src/shared/mockData";
import { Overlay } from "src/design/Overlay";
import { Option, none, some, isSome, map } from "fp-ts/lib/Option";
import { RootState } from "src/root/root.types";
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
import { PaletteTemplate } from "src/shared/PaletteTemplate";
import Chip from "@material-ui/core/Chip";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

const SidebarControlsBox = styled.div`
  width: 300px;
  margin-right: 32px;
  display: flex;

  > div:first-child {
    overflow: auto;
    width: 100%;
  }
`;

const TemplateBox = styled.div`
  flex: 1;
  display: grid;
  justify-items: center;
  grid-template-columns: auto auto;
  grid-template-rows: 48px 48px;
  grid-column-gap: 16px;
  grid-row-gap: 16px;
`;

const TagsBox = styled.div`
  > div,
  button {
    margin: 0 8px 8px 0;
  }
`;

type PassedProps = {};
type InjectedProps = { isPrivate: boolean };
type Props = PassedProps & InjectedProps;

const SidebarControls = ({ isPrivate }: Props) => {
  return (
    <CardContent>
      <Typography gutterBottom variant="h5" component="h2">
        Controls
      </Typography>
      <FormControlLabel
        control={
          <Switch checked={isPrivate} onChange={() => null} value="checkedA" />
        }
        label="Secondary"
      />
    </CardContent>
  );
};

const mapState = (state: RootState) => {
  return {
    isPrivate: true,
  };
};

const mapDispatch = (dispatch: Dispatch) => {
  return {};
};

const connector = connect(mapState, mapDispatch)(SidebarControls);
export { connector as SidebarControls };
