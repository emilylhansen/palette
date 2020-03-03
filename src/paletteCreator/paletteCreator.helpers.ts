import { Tag, Color } from "src/shared/shared.types";
import { v4 as uuidv4 } from "uuid";
import faker from "faker";
import { colorHexLens } from "src/shared/shared.lenses";
import { Values, Errors } from "src/paletteCreator/paletteCreator.types";
import { Lens } from "monocle-ts";
import { isEmpty as isEmptyArray } from "fp-ts/lib/Array";

export const makeNewTag = (value: string): Tag => ({ value, key: uuidv4() });

export const makeNewColor = (hex: string): Color => ({
  hex,
  key: uuidv4(),
  name: faker.name.title(),
});

export const isEmptyOrBlankString = (value: string): boolean =>
  value === "" || value.split(" ").every(v => v === "");

export const setColorFormField = ({
  colors,
  hex,
  key,
}: {
  colors: Array<Color>;
  hex: string;
  key: string;
}): Array<Color> => {
  return colors.map(c => {
    if (c.key === key) {
      colorHexLens.set(hex)(c);
    }

    return c;
  });
};

export const addColorFormField = ({
  colors,
  hex,
}: {
  colors: Array<Color>;
  hex: string;
}): Array<Color> => [...colors, makeNewColor(hex)];

export const removeColorFormField = ({
  colors,
  key,
}: {
  colors: Array<Color>;
  key: string;
}): Array<Color> => colors.filter(c => c.key !== key);

export const validate = (values: Values) => {
  let errors: Errors = {
    name: "",
    description: "",
    colors: "",
    tags: "",
    newTag: "",
  };

  if (isEmptyOrBlankString(values.name)) {
    errors = Lens.fromProp<Errors>()("name").modify(_ => "Required")(errors);
  }

  if (isEmptyOrBlankString(values.description)) {
    errors = Lens.fromProp<Errors>()("description").modify(_ => "Required")(
      errors
    );
  }

  if (isEmptyArray(values.colors)) {
    errors = Lens.fromProp<Errors>()("colors").modify(
      _ => "Must contain at least one color"
    )(errors);
  }

  return errors;
};
