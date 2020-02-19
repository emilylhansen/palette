import { Action } from "redux";
import { authReducer } from "src/auth/auth.reducer";
import { combineReducers } from "redux";

export const rootReducer = combineReducers({ authReducer });
