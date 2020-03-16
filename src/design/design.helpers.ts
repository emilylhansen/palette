import { isNil } from "src/shared/shared.typeGuards";

export enum GutterSize {
  Small = 4,
  Medium = 8,
  Large = 16,
}

export type Gutters = {
  gutterTop?: GutterSize;
  gutterRight?: GutterSize;
  gutterBottom?: GutterSize;
  gutterLeft?: GutterSize;
};

const makeGutter = (gutter: GutterSize): string =>
  `${isNil(gutter) ? 0 : gutter}px`;

export const makeGutters = ({
  gutterTop,
  gutterBottom,
  gutterRight,
  gutterLeft,
}: Gutters): string =>
  `${makeGutter(gutterTop)} ${makeGutter(gutterRight)} ${makeGutter(
    gutterBottom
  )} ${makeGutter(gutterLeft)}`;
