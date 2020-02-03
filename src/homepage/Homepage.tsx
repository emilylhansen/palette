import React from "react";
import { connect, ConnectedProps, Provider } from "react-redux";
import { createStore, Dispatch } from "redux";
import styled from "styled-components";
import { PaletteCard } from "/Users/emilyhansen/Desktop/palette-app/src/shared/PaletteCard";
import { range } from "fp-ts/lib/Array";

const HomepageBox = styled.div`
  flex: 1;
  padding: 16px;
  overflow: auto;
`;

type PassedProps = {};
type InjectedProps = {};
type Props = PassedProps & InjectedProps;

export const Homepage = ({}: Props) => {
  return (
    <HomepageBox>
      {range(0, 30).map(i => (
        <PaletteCard key={i} palette={} />
      ))}
    </HomepageBox>
  );
};
