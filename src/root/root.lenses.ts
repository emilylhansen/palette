import { Lens } from "monocle-ts";
import { RootState } from "src/root/root.types";

export const sharedStateLens = Lens.fromProp<RootState>()("shared");

export const authStateLens = Lens.fromProp<RootState>()("auth");

export const paletteCreatorStateLens = Lens.fromProp<RootState>()(
  "paletteCreator"
);
