import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider";
import React from "react";
import { SidebarFavorites } from "src/paletteCreator/SidebarFavorites";
import { SidebarTags } from "src/paletteCreator/SidebarTags";
import { SidebarDetails } from "src/paletteCreator/SidebarDetails";
import styled from "styled-components";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Theme } from "src/root/root.theme";
import { Medias } from "src/root/root.styles";

const useStyles = makeStyles((theme: Theme["mui"]) => {
  return createStyles({
    root: {
      overflow: "auto",
      width: "100%",
      height: "100%",
    },
  });
});

const PaletteCreatorSidebarBox = styled.div`
  overflow: auto;

  @media (max-width: ${Medias.EXTRA_SMALL.maxWidth}px) {
    width: 100%;
    flex: 1;
  }

  @media (min-width: ${Medias.SMALL.minWidth}px) {
    width: 100%;
    flex: 1;
  }

  @media (min-width: ${Medias.MEDIUM.minWidth}px) {
    width: 280px;
    flex: none;
  }

  @media (min-width: ${Medias.LARGE.minWidth}px) {
    width: 280px;
    flex: none;
  }

  @media (min-width: ${Medias.EXTRA_LARGE.minWidth}px) {
    width: 280px;
    flex: none;
  }
`;

type Props = {};

const usePaletteCreatorSidebar = (props: Props) => {
  const classes = useStyles();

  return { classes };
};

export const PaletteCreatorSidebar = (props: Props) => {
  const state = usePaletteCreatorSidebar(props);

  return (
    <PaletteCreatorSidebarBox>
      <Card classes={{ root: state.classes.root }}>
        <SidebarDetails />
        <Divider variant="middle" />
        <SidebarTags />
        <Divider variant="middle" />
        <SidebarFavorites />
      </Card>
    </PaletteCreatorSidebarBox>
  );
};
