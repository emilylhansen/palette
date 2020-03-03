import { Lens } from "monocle-ts";
import { Palette } from "src/shared/shared.types";
import { PaletteCreatorState } from "src/paletteCreator/paletteCreator.types";
import {
  paletteAuthorIdLens,
  paletteColorsLens,
  paletteDescriptionLens,
  paletteKeyLens,
  paletteNameLens,
  palettePrivateLens,
  paletteTagsLens,
} from "src/shared/shared.lenses";
import { RootState } from "src/root/root.types";

// export const paletteLens = Lens.fromProp<PaletteCreatorState>()("palette");

// export const nameLens = paletteLens.compose(paletteNameLens);

// export const colorsLens = paletteLens.compose(paletteColorsLens);

// export const descriptionLens = paletteLens.compose(paletteDescriptionLens);

// export const privateLens = paletteLens.compose(palettePrivateLens);

// export const tagsLens = paletteLens.compose(paletteTagsLens);
