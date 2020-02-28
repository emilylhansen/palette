import React, { useState, useEffect } from "react";
import {
  connect,
  ConnectedProps,
  Provider,
  useDispatch,
  useSelector,
} from "react-redux";
import { createStore, Dispatch } from "redux";
import styled from "styled-components";
import { PaletteOverviewCard } from "src/shared/PaletteOverviewCard";
import { PaletteTileCard } from "src/shared/PaletteTileCard";
import { range } from "fp-ts/lib/Array";
import { mockPalettes } from "src/shared/mockData";
import { Overlay } from "src/design/Overlay";
import { Option, none, some, isSome, map } from "fp-ts/lib/Option";
import { Login } from "src/auth/Login";
import { Modal } from "src/design/Modal";
import { getColors, getPalettes, getUsers } from "src/shared/shared.actions";
import { Palette } from "src/shared/shared.types";
import { RootState } from "src/root/root.types";
import {
  getPalettesById,
  getColorsById,
  getUsersById,
} from "src/shared/shared.selectors";

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
type InjectedProps = {
  // palettesById: RootState["palettesById"];
  // colorsById: RootState["colorsById"];
};
type Props = PassedProps & InjectedProps;

export const Homepage = ({}: Props) => {
  const [selectedPalette, setSelectedPalette] = useState<Option<Palette>>(none);

  debugger;
  useEffect(() => {
    dispatch(getPalettes());
    dispatch(getColors());
    dispatch(getUsers());
  }, []);

  const dispatch = useDispatch();
  const palettesById = useSelector(getPalettesById);
  const colorsById = useSelector(getColorsById);
  const usersById = useSelector(getUsersById);

  return (
    <HomepageBox>
      {Object.values(palettesById).map(palette => (
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

const mapState = (state: RootState) => {
  return {
    palettesById: getPalettesById(state),
    colorsById: getColorsById(state),
  };
};

const mapDispatch = (dispatch: Dispatch) => {
  return {};
};

const connector = connect(mapState, mapDispatch)(Homepage);
// export { connector as Homepage };
