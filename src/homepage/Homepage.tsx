import React, { useState } from "react";
import { connect, ConnectedProps, Provider } from "react-redux";
import { createStore, Dispatch } from "redux";
import styled from "styled-components";
import { PaletteOverviewCard } from "../shared/PaletteOverviewCard";
import { PaletteTileCard } from "/Users/emilyhansen/Desktop/palette-app/src/shared/PaletteTileCard";
import { range } from "fp-ts/lib/Array";
import { mockPalettes } from "/Users/emilyhansen/Desktop/palette-app/src/shared/mockData";
import { Overlay } from "/Users/emilyhansen/Desktop/palette-app/src/shared/Overlay";
import { Option, none, some, isSome, map } from "fp-ts/lib/Option";
import { Palette } from "/Users/emilyhansen/Desktop/palette-app/src/root/root.types";

const HomepageBox = styled.div`
  flex: 1;
  padding: 48px;
  overflow: auto;
  display: grid;
  grid-column-gap: 32px;
  grid-row-gap: 32px;
  justify-content: center;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  align-items: center;
  justify-items: center;
`;

type PassedProps = {};
type InjectedProps = {};
type Props = PassedProps & InjectedProps;

export const Homepage = ({}: Props) => {
  const [selectedPalette, setSelectedPalette] = useState<Option<Palette>>(none);

  return (
    <HomepageBox>
      {mockPalettes.map(palette => (
        <PaletteTileCard
          key={palette.key}
          palette={palette}
          onClick={() => setSelectedPalette(some(palette))}
        />
      ))}
      <Overlay
        isOpen={isSome(selectedPalette)}
        onClose={() => setSelectedPalette(none)}
      >
        {isSome(selectedPalette) && (
          <PaletteOverviewCard palette={selectedPalette.value} />
        )}
      </Overlay>
    </HomepageBox>
  );
};
