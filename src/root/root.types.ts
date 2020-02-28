import {
  AuthState,
  initialState as authInitialState,
} from "src/auth/auth.types";
import {
  SharedState,
  initialState as sharedInitialState,
} from "src/shared/shared.types";

export type RootState = {
  auth: AuthState;
  shared: SharedState;
};

export const initialState: RootState = {
  auth: authInitialState,
  shared: sharedInitialState,
};
