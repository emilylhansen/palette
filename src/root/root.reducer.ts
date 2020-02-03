import { Action } from "redux";
import { authReducer } from "/Users/emilyhansen/Desktop/palette-app/src/auth/auth.reducer";
import { combineReducers } from "redux";

export const rootReducer = combineReducers({ authReducer });
