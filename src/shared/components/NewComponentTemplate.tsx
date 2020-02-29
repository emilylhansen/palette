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
import { RootState } from "src/root/root.types";

const Box = styled.div``;

type PassedProps = {};
type InjectedProps = {};
type Props = PassedProps & InjectedProps;

const Component = ({}: Props) => {
  return <Box></Box>;
};

const mapState = (state: RootState) => {
  return {};
};

const mapDispatch = (dispatch: Dispatch) => {
  return {
    add: () => dispatch({ type: "ADD" }),
  };
};

const connector = connect(mapState, mapDispatch)(Component);
export { connector as Component };
