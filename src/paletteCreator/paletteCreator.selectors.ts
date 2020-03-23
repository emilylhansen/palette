import { createSelector } from "reselect";
import { Color } from "src/shared/shared.types";
import {
  getFavoriteColorIds,
  getColorsById,
} from "src/shared/shared.selectors";
import { lookup } from "fp-ts/lib/Record";
import { pipe } from "fp-ts/lib/pipeable";
import { map, getOrElse } from "fp-ts/lib/Option";
import { fold } from "@devexperts/remote-data-ts";

export const getFavoriteColorsById = createSelector(
  getFavoriteColorIds,
  getColorsById,
  (favoriteColorIds, colorsById): Record<string, Color> => {
    const favoriteColorsById = fold<
      string,
      Array<string>,
      Record<string, Color>
    >(
      () => ({}),
      () => ({}),
      () => ({}),
      favoriteColorIds_ => {
        const favoriteColorsById = favoriteColorIds_.reduce<
          Record<string, Color>
        >(
          (acc, cur) =>
            pipe(
              lookup(cur, colorsById),
              map(c => ({ ...acc, [cur]: c })),
              getOrElse(() => acc)
            ),
          {}
        );

        return favoriteColorsById;
      }
    )(favoriteColorIds);

    return favoriteColorsById;
  }
);
