import convert from "color-convert";
import { isNil } from "src/shared/shared.typeGuards";
import { lookup } from "fp-ts/lib/Array";

export const convertHexToRGBA = ({
  hex,
  opacity,
}: {
  hex: string;
  opacity?: number;
}): string => {
  const rgbList = convert.hex.rgb(hex);

  /** don't do this */
  const r = lookup(0, rgbList);
  const g = lookup(0, rgbList);
  const b = lookup(0, rgbList);

  const rgbaString = `rgba(${r}, ${g}, ${b}, ${isNil(opacity) ? 1 : opacity})`;

  return rgbaString;
};
