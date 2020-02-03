import React from "react";
import { connect, ConnectedProps, Provider } from "react-redux";
import { createStore, Dispatch } from "redux";
import styled from "styled-components";
import { PaletteCard } from "/Users/emilyhansen/Desktop/palette-app/src/shared/PaletteCard";
import { range } from "fp-ts/lib/Array";
import { mockPalettes } from "/Users/emilyhansen/Desktop/palette-app/src/shared/mockData";

const HomepageBox = styled.div`
  flex: 1;
  padding: 48px;
  overflow: auto;
  display: grid;
  grid-column-gap: 16px;
  grid-row-gap: 16px;
  justify-content: center;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  align-items: center;
  justify-items: center;
`;

type PassedProps = {};
type InjectedProps = {};
type Props = PassedProps & InjectedProps;

export const Homepage = ({}: Props) => {
  return (
    <HomepageBox>
      {mockPalettes.map(palette => (
        <PaletteCard key={palette.key} palette={palette} />
      ))}
    </HomepageBox>
  );
};
