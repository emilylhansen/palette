import { handle } from "redux-pack";
import { SharedState, Palette, Color } from "src/shared/shared.types";
import {
  GetPalettes,
  GetRandomObject,
  GetObjectColors,
  GetColorPalettesList,
  GetColorPaletteInfo,
} from "src/shared/shared.actions";
import { pending, failure, success } from "@devexperts/remote-data-ts";
import { Lens } from "monocle-ts";
import {
  Object,
  ObjectColor,
  ColorPaletteColor,
} from "src/root/root.api.types";
import { fromNullable, getOrElse, exists, isSome, map } from "fp-ts/lib/Option";
import { pipe } from "fp-ts/lib/pipeable";
import { head, findFirst } from "fp-ts/lib/Array";
import { lookup } from "fp-ts/lib/Record";
import { makeTags } from "src/shared/mockData";

const makePalette = ({
  object,
  objectColors,
  colorPaletteInfo,
}: {
  object: Object;
  objectColors: Array<ObjectColor>;
  colorPaletteInfo: Record<string, ColorPaletteColor>;
}): Palette => {
  const colors: Array<Color> = objectColors.reduce<Array<Color>>(
    (acc, cur) =>
      pipe(
        lookup(cur.closest_crayola, colorPaletteInfo),
        map(c => [
          ...acc,
          {
            name: c.name,
            hex: cur.closest_crayola,
            key: `${cur}-${c.name}`,
          },
        ]),
        getOrElse(() => acc)
      ),
    []
  );

  return {
    name: object.title,
    description: pipe(
      fromNullable(object.description),
      getOrElse(() => "")
    ),
    colors,
    private: isSome(fromNullable(object.on_display)),
    authorId: pipe(
      head(object.participants),
      map(p => p.person_id),
      getOrElse(() => "logged-in-user-id")
    ),
    key: object.id,
    tags: makeTags(),
  };
};

export const GetPalettesHandlers = ({
  state,
  action,
}: {
  state: SharedState;
  action: GetPalettes;
}) => {
  return handle(state, action, {
    success: (prevState, newAction) => {
      const {
        // objects,
        // objectColors,
        // paletteList,
        // colorPaletteInfo,
      } = newAction.payload;

      return {
        ...prevState,
        palettesById: {},
      };
    },
  });
};
