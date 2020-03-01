import { Lens } from "monocle-ts";
import { Palette, Color } from "src/shared/shared.types";

export const paletteKeyLens = Lens.fromProp<Palette>()("key");

export const paletteAuthorIdLens = Lens.fromProp<Palette>()("authorId");

export const paletteNameLens = Lens.fromProp<Palette>()("name");

export const paletteColorsLens = Lens.fromProp<Palette>()("colors");

export const paletteDescriptionLens = Lens.fromProp<Palette>()("description");

export const palettePrivateLens = Lens.fromProp<Palette>()("private");

export const paletteTagsLens = Lens.fromProp<Palette>()("tags");

export const colorHexLens = Lens.fromProp<Color>()("hex");
