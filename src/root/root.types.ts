import {
  initialState as authInitialState,
  AuthState,
} from "src/auth/auth.types";
import {
  initialState as paletteCreatorInitialState,
  PaletteCreatorState,
} from "src/paletteCreator/paletteCreator.types";
import {
  initialState as sharedInitialState,
  SharedState,
} from "src/shared/shared.types";

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

export type ValueOf<T> = T[keyof T];
