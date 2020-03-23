import { Tag, Color } from "src/shared/shared.types";
import { v4 as uuidv4 } from "uuid";
import faker from "faker";
import { colorHexLens } from "src/shared/shared.lenses";
import { Values, Errors } from "src/paletteCreator/paletteCreator.types";
import { Lens } from "monocle-ts";
import { isEmpty as isEmptyArray } from "fp-ts/lib/Array";
import { isEmptyOrBlankString, isNil } from "src/shared/shared.typeGuards";

export const makeNewTag = (value: string): Tag => ({ value, key: uuidv4() });

export const makeNewColor = (hex: string): Color => ({
  hex,
  key: uuidv4(),
  name: faker.name.title(),
});

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

export const validate = (values: Partial<Values>) => {
  let errors: Errors = {
    name: "",
    description: "",
    colors: "",
    tags: "",
    newTag: "",
  };
  /** check for nil values, since react-final-form drops the key from state if empty onChange */
  if (isNil(values.name) || isEmptyOrBlankString(values.name)) {
    errors = Lens.fromProp<Errors>()("name").modify(_ => "Required")(errors);
  }

  if (isNil(values.description) || isEmptyOrBlankString(values.description)) {
    errors = Lens.fromProp<Errors>()("description").modify(_ => "Required")(
      errors
    );
  }

  if (isNil(values.colors) || isEmptyArray(values.colors)) {
    errors = Lens.fromProp<Errors>()("colors").modify(
      _ => "Must contain at least one color"
    )(errors);
  }

  return errors;
};
