import { isSome, none, Option, some } from "fp-ts/lib/Option";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Modal } from "src/design/Modal";
import { ScrollToTop } from "src/design/ScrollToTop";
import { Medias } from "src/root/root.styles";
import { PaletteOverviewCard } from "src/shared/components/PaletteOverviewCard";
import { PaletteTileCard } from "src/shared/components/PaletteTileCard";
import { getPalettesById } from "src/shared/shared.selectors";
import { Palette } from "src/shared/shared.types";
import styled from "styled-components";

const HomepageBox = styled.div`
  flex: 1;
  display: grid;
  justify-content: stretch;
  align-items: center;
  justify-items: center;

  @media (max-width: ${Medias.EXTRA_SMALL.maxWidth}px) {
    grid-column-gap: ${Medias.EXTRA_SMALL.gutters}px;
    grid-row-gap: ${Medias.EXTRA_SMALL.gutters}px;
    margin: ${Medias.EXTRA_SMALL.margins}px;
    grid-template-columns: repeat(${Medias.EXTRA_SMALL.columns / 4}, 1fr);
  }

  @media (min-width: ${Medias.SMALL.minWidth}px) {
    grid-column-gap: ${Medias.SMALL.gutters}px;
    grid-row-gap: ${Medias.SMALL.gutters}px;
    margin: ${Medias.SMALL.margins}px;
    grid-template-columns: repeat(${Medias.SMALL.columns / 4}, 1fr);
  }

  @media (min-width: ${Medias.MEDIUM.minWidth}px) {
    grid-column-gap: ${Medias.MEDIUM.gutters}px;
    grid-row-gap: ${Medias.MEDIUM.gutters}px;
    margin: ${Medias.MEDIUM.margins}px;
    grid-template-columns: repeat(${Medias.MEDIUM.columns / 4}, 1fr);
  }

  @media (min-width: ${Medias.LARGE.minWidth}px) {
    grid-column-gap: ${Medias.LARGE.gutters}px;
    grid-row-gap: ${Medias.LARGE.gutters}px;
    margin: ${Medias.LARGE.margins}px;
    grid-template-columns: repeat(${Medias.LARGE.columns / 4}, 1fr);
  }

  @media (min-width: ${Medias.EXTRA_LARGE.minWidth}px) {
    grid-column-gap: ${Medias.EXTRA_LARGE.gutters}px;
    grid-row-gap: ${Medias.EXTRA_LARGE.gutters}px;
    margin: ${Medias.EXTRA_LARGE.margins}px;
    grid-template-columns: repeat(${Medias.EXTRA_LARGE.columns / 4}, 1fr);
  }
`;

type Props = {};

const useHomepage = (props: Props) => {
  const [selectedPalette, setSelectedPalette] = useState<Option<Palette>>(none);

  const palettesById = useSelector(getPalettesById);

  return { selectedPalette, setSelectedPalette, palettesById };
};

export const Homepage = (props: Props) => {
  const state = useHomepage(props);

  return (
    <ScrollToTop>
      <HomepageBox>
        {Object.values(state.palettesById).map(palette => {
          return (
            <PaletteTileCard
              key={palette.key}
              palette={palette}
              onClick={() => state.setSelectedPalette(some(palette))}
            />
          );
        })}
        <Modal
          isOpen={isSome(state.selectedPalette)}
          onClose={() => state.setSelectedPalette(none)}
        >
          {isSome(state.selectedPalette) && (
            <PaletteOverviewCard palette={state.selectedPalette.value} />
          )}
        </Modal>
      </HomepageBox>
    </ScrollToTop>
  );
};
