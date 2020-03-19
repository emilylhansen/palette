import {
  failure,
  fold,
  initial,
  pending,
  RemoteData,
  success,
  exists,
} from "@devexperts/remote-data-ts";
import { range } from "fp-ts/lib/Array";
import { isSome, map, none, Option, some } from "fp-ts/lib/Option";
import React, { useEffect, useState } from "react";
import {
  connect,
  ConnectedProps,
  Provider,
  useDispatch,
  useSelector,
} from "react-redux";
import { createStore, Dispatch } from "redux";
import { authenticate } from "src/auth/auth.actions";
import { Login } from "src/auth/Login";
import { Modal } from "src/design/Modal";
import { Overlay } from "src/design/Overlay";
import { ScrollToTop } from "src/design/ScrollToTop";
import { RootState } from "src/root/root.types";
import { PaletteOverviewCard } from "src/shared/components/PaletteOverviewCard";
import { PaletteTileCard } from "src/shared/components/PaletteTileCard";
import { mockPalettes, mockCurrentUser } from "src/shared/mockData";
import {
  getColorPaletteInfo,
  getColorPalettesList,
  getColors,
  getFavoriteColorIds as getFavoriteColorIdsAction,
  getFavoritePaletteIds as getFavoritePaletteIdsAction,
  getObjectColors,
  getPalettes,
  getRandomObject,
  getUsers,
} from "src/shared/shared.actions";
import {
  getColorsById,
  getFavoriteColorIds as getFavoriteColorIdsSelector,
  getFavoritePaletteIds as getFavoritePaletteIdsSelector,
  getPalettesById,
  getUsersById,
} from "src/shared/shared.selectors";
import { Palette } from "src/shared/shared.types";
import styled from "styled-components";

const HomepageBox = styled.div`
  flex: 1;
  padding: 48px;
  // overflow: auto;
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

  const dispatch = useDispatch();
  const palettesById = useSelector(getPalettesById);
  const usersById = useSelector(getUsersById);
  const favoriteColorIds = useSelector(getFavoriteColorIdsSelector);
  const favoritePaletteIds = useSelector(getFavoritePaletteIdsSelector);

  useEffect(() => {
    dispatch(authenticate({ user: mockCurrentUser }));
    dispatch(getUsers());
    dispatch(getPalettes());
    dispatch(getFavoriteColorIdsAction());
    dispatch(getFavoritePaletteIdsAction());
  }, []);

  return (
    <ScrollToTop>
      <HomepageBox>
        {Object.values(palettesById).map(palette => {
          return (
            <PaletteTileCard
              key={palette.key}
              palette={palette}
              onClick={() => setSelectedPalette(some(palette))}
            />
          );
        })}
        <Modal
          isOpen={isSome(selectedPalette)}
          onClose={() => setSelectedPalette(none)}
        >
          {isSome(selectedPalette) && (
            <PaletteOverviewCard palette={selectedPalette.value} />
          )}
        </Modal>
      </HomepageBox>
    </ScrollToTop>
  );
};
