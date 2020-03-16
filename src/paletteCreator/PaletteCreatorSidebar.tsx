import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider";
import React from "react";
import { SidebarFavorites } from "src/paletteCreator/SidebarFavorites";
import { SidebarTags } from "src/paletteCreator/SidebarTags";
import { SidebarDetails } from "src/paletteCreator/SidebarDetails";
import styled from "styled-components";

const PaletteCreatorSidebarBox = styled.div`
  width: 300px;
  margin-right: 32px;
  display: flex;

  > div:first-child {
    overflow: auto;
    width: 100%;
  }
`;

type Props = {};

const usePaletteCreatorSidebar = (props: Props) => {
  return {};
};

export const PaletteCreatorSidebar = (props: Props) => {
  const state = usePaletteCreatorSidebar(props);

  return (
    <PaletteCreatorSidebarBox>
      <Card>
        <SidebarDetails />
        <Divider variant="middle" />
        <SidebarTags />
        <Divider variant="middle" />
        <SidebarFavorites />
      </Card>
    </PaletteCreatorSidebarBox>
  );
};
