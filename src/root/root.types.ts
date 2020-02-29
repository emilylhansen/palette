import {
  AuthState,
  initialState as authInitialState,
} from "src/auth/auth.types";
import {
  SharedState,
  initialState as sharedInitialState,
} from "src/shared/shared.types";
import {
  PaletteCreatorState,
  initialState as paletteCreatorInitialState,
} from "src/paletteCreator/paletteCreator.types";

export type RootState = {
  auth: AuthState;
  shared: SharedState;
  paletteCreator: PaletteCreatorState;
};

export const initialState: RootState = {
  auth: authInitialState,
  shared: sharedInitialState,
  paletteCreator: paletteCreatorInitialState,
};
