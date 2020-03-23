import { Lens } from "monocle-ts";
import { AuthState } from "src/auth/auth.types";

export const currentUserLens = Lens.fromProp<AuthState>()("currentUser");
