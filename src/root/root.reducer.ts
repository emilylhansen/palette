import { authReducer } from "src/auth/auth.reducer";
import { combineReducers } from "redux";
import { sharedReducer } from "src/shared/shared.reducer";
import { paletteCreatorReducer } from "src/paletteCreator/paletteCreator.reducer";

export const rootReducer = combineReducers({
  auth: authReducer,
  shared: sharedReducer,
  paletteCreator: paletteCreatorReducer,
});
