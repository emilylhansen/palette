import React from "react";
import { css } from "styled-components";
import { styled } from "src/root/root.theme";

enum MediaSize {
  ExtraSmall = "EXTRA_SMALL",
  Small = "SMALL",
  Medium = "MEDIUM",
  Large = "LARGE",
  ExtraLarge = "EXTRA_LARGE",
}

type MediaLayout = {
  maxWidth?: number;
  minWidth?: number;
  columns: number;
  gutters: number;
  margins: number;
};

export const Medias: Record<MediaSize, MediaLayout> = {
  EXTRA_SMALL: {
    maxWidth: 600,
    columns: 4,
    gutters: 16,
    margins: 16,
  },
  SMALL: {
    minWidth: 600,
    columns: 8,
    gutters: 24,
    margins: 24,
  },
  MEDIUM: {
    minWidth: 768,
    columns: 12,
    gutters: 24,
    margins: 24,
  },
  LARGE: {
    minWidth: 992,
    columns: 12,
    gutters: 24,
    margins: 24,
  },
  EXTRA_LARGE: {
    minWidth: 1200,
    columns: 12,
    gutters: 24,
    margins: 24,
  },
};

const GridBox = styled.div`
  display: grid;
  border: 1px solid green;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: 64px 1fr;
  grid-column-gap: 16px;
  justify-content: stretch;
  align-content: stretch;
  width: 100%;
  grid-template-areas: "header header header header header header header header header header header header ";
`;

const Header = styled.div`
  grid-area: header;
  border: 1px solid red;
`;

export const Grid = () => {
  return (
    <GridBox>
      <Header>this is the header</Header>
    </GridBox>
  );
};
