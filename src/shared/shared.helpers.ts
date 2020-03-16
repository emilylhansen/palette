import convert from "color-convert";
import { isNil } from "src/shared/shared.typeGuards";
import { lookup } from "fp-ts/lib/Array";
import { pipe } from "fp-ts/lib/pipeable";
import { Option, some, none, isSome } from "fp-ts/lib/Option";

export const convertHexToRGBA = ({
  hex,
  opacity,
}: {
  hex: string;
  opacity?: number;
}): Option<string> => {
  const rgbList = convert.hex.rgb(hex);

  /** don't do this */
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
