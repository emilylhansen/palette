import React, { useState } from "react";
import { connect, ConnectedProps, Provider } from "react-redux";
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
import { SidebarControls } from "src/paletteCreator/SidebarControls";

const PaletteCreatorSidebarBox = styled.div`
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
type InjectedProps = {};
type Props = PassedProps & InjectedProps;

export const PaletteCreatorSidebar = ({}: Props) => {
  return (
    <PaletteCreatorSidebarBox>
      <Card>
        <CardContent>
          <TextField
            label="Name"
            id="standard-size-normal"
            defaultValue="Normal"
          />
          <TextField
            id="standard-multiline-static"
            label="Description"
            multiline
            rows="4"
            defaultValue="Default Value"
          />
        </CardContent>
        <Divider variant="middle" />
        {/* <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Template
          </Typography>
          <TemplateBox>
            <PaletteTemplate palette={mockPalettes[0]} />
            <PaletteTemplate palette={mockPalettes[0]} />
            <PaletteTemplate palette={mockPalettes[0]} />
            <PaletteTemplate palette={mockPalettes[0]} />
          </TemplateBox>
        </CardContent>
        <Divider variant="middle" /> */}
        {/* <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Colors
          </Typography>
        </CardContent>
        <Divider variant="middle" /> */}
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Tags
          </Typography>
          <TagsBox>
            {range(0, 10).map(t => (
              <Chip
                key={t}
                label="Primary clickable"
                clickable
                color="primary"
                // onDelete={handleDelete}
                //   deleteIcon={<DoneIcon />}
              />
            ))}
            <IconButton
              key={"add-button"}
              color="secondary"
              size="small"
              iconName={"add"}
            />
          </TagsBox>
        </CardContent>
        <Divider variant="middle" />
        <SidebarControls />
      </Card>
    </PaletteCreatorSidebarBox>
  );
};
