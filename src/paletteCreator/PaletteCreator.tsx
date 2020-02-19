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
import { Palette } from "src/root/root.types";
import { PaletteCreatorSidebar } from "src/paletteCreator/PaletteCreatorSidebar";
import Button from "@material-ui/core/Button";
import { PaletteTemplate } from "src/shared/PaletteTemplate";
import { IconButton } from "src/design/IconButton";

const PaletteCreatorBox = styled.div`
  display: flex;
  flex: 1;
  padding: 32px;
`;

const ContentBox = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const ContentTopBox = styled.div`
  flex: 1;
  display: flex;
  margin: 56px 32px;
`;

const AddBox = styled.div`
  display: flex;
  align-items: center;
  margin-left: 16px;
`;

const FooterBox = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
`;

type PassedProps = {};
type InjectedProps = {};
type Props = PassedProps & InjectedProps;

export const PaletteCreator = ({}: Props) => {
  return (
    <PaletteCreatorBox>
      <PaletteCreatorSidebar />
      <ContentBox>
        <ContentTopBox>
          <PaletteTemplate palette={mockPalettes[0]} enableColorDetails />
          <AddBox>
            <IconButton color="secondary" iconName={"add"} />
          </AddBox>
        </ContentTopBox>
        <FooterBox>
          <Button>cancel</Button>
          <Button>create</Button>
        </FooterBox>
      </ContentBox>
    </PaletteCreatorBox>
  );
};
