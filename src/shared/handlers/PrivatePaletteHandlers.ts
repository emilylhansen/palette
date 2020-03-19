import { handle } from "redux-pack";
import { SharedState, Palette } from "src/shared/shared.types";
import { PrivatePalette } from "src/shared/shared.actions";
import { palettesByIdLens } from "src/shared/shared.lenses";
import {
  pending,
  failure,
  success,
  initial,
  fold,
  RemoteData,
} from "@devexperts/remote-data-ts";
import { Lens } from "monocle-ts";
import { lookup } from "fp-ts/lib/Record";
import { map, getOrElse } from "fp-ts/lib/Option";
import { pipe } from "fp-ts/lib/pipeable";

export const PrivatePaletteHandlers = ({
  state,
  action,
}: {
  state: SharedState;
  action: PrivatePalette;
}) => {
  return handle(state, action, {
    // start: (prevState, newAction) => {
    //   return {
    //     ...prevState,
    //     palettesById: pending,
    //   };
    // },
    // failure: (prevState, newAction) => {
    //   return {
    //     ...prevState,
    //     palettesById: failure("could not change privacy of palette"),
    //   };
    // },
    success: (prevState, newAction) => {
      const { isPrivate, paletteKey } = action.payload;

      const paletteOption = lookup(paletteKey, prevState.palettesById);

      const palettesById = pipe(
        paletteOption,
        map(paletteOption_ => {
          const privateLens = Lens.fromProp<Palette>()("private");
          const newPalette = privateLens.set(isPrivate)(paletteOption_);

          const newPaletteLens = Lens.fromProp<SharedState["palettesById"]>()(
            paletteKey
          );
          const newPalettesById = newPaletteLens.set(newPalette)(
            palettesByIdLens.get(prevState)
          );

          return newPalettesById;
        }),
        getOrElse(() => prevState.palettesById)
      );

      return {
        ...prevState,
        palettesById,
      };
    },
  });
};
