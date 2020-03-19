import { Lens } from "monocle-ts";
import { Palette, Color, User } from "src/shared/shared.types";
import { initialState, AuthState } from "src/auth/auth.types";

export const currentUserLens = Lens.fromProp<AuthState>()("currentUser");
