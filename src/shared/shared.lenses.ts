import { Lens } from "monocle-ts";
import { Palette, Color, SharedState } from "src/shared/shared.types";

export const paletteKeyLens = Lens.fromProp<Palette>()("key");

export const paletteAuthorIdLens = Lens.fromProp<Palette>()("authorId");

export const paletteNameLens = Lens.fromProp<Palette>()("name");

export const paletteColorsLens = Lens.fromProp<Palette>()("colors");

export const paletteDescriptionLens = Lens.fromProp<Palette>()("description");

export const palettePrivateLens = Lens.fromProp<Palette>()("private");

export const paletteTagsLens = Lens.fromProp<Palette>()("tags");

export const colorHexLens = Lens.fromProp<Color>()("hex");

export const palettesByIdLens = Lens.fromProp<SharedState>()("palettesById");

export const colorsByIdLens = Lens.fromProp<SharedState>()("colorsById");

export const usersByIdLens = Lens.fromProp<SharedState>()("usersById");

export const favoritePaletteIdsLens = Lens.fromProp<SharedState>()(
  "favoritePaletteIds"
);

export const favoriteColorIdsLens = Lens.fromProp<SharedState>()(
  "favoriteColorIds"
);

export const objectsByIdLens = Lens.fromProp<SharedState>()("objectsById");

export const colorsByObjectIdLens = Lens.fromProp<SharedState>()(
  "colorsByObjectId"
);

export const availablePalettesLens = Lens.fromProp<SharedState>()(
  "availablePalettes"
);

export const colorsByPaletteIdLens = Lens.fromProp<SharedState>()(
  "colorsByPaletteId"
);
