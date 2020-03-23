import convert from "color-convert";
import { isNil } from "src/shared/shared.typeGuards";
import { lookup } from "fp-ts/lib/Array";
import { Option, some, none, isSome } from "fp-ts/lib/Option";
import { Color } from "src/shared/shared.types";

export const convertHexToRGBA = ({
  hex,
  opacity,
}: {
  hex: string;
  opacity?: number;
}): Option<string> => {
  const rgbList = convert.hex.rgb(hex);

  const r = lookup(0, rgbList);
  const g = lookup(1, rgbList);
  const b = lookup(2, rgbList);

  if (isSome(r) && isSome(g) && isSome(b)) {
    const rgbaString = `rgba(${r.value}, ${g.value}, ${b.value}, ${
      isNil(opacity) ? 1 : opacity
    })`;

    return some(rgbaString);
  } else {
    return none;
  }
};

export const makeCopyValue = (colors: Array<Color>): string =>
  colors.map(c => c.hex).join(", ");
