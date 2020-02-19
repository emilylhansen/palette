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
import { Login } from "src/auth/Login";
import { Modal } from "src/design/Modal";

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
      <Modal
        isOpen={isSome(selectedPalette)}
        onClose={() => setSelectedPalette(none)}
      >
        {isSome(selectedPalette) && (
          <PaletteOverviewCard palette={selectedPalette.value} />
        )}
      </Modal>
      {/* <Login /> */}
    </HomepageBox>
  );
};
