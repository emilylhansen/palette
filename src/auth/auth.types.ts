import { Option, none } from "fp-ts/lib/Option";

export type AuthReducerState = {
  isAuthenticated: boolean;
  uuid: Option<string>;
};

export const initialState: AuthReducerState = {
  isAuthenticated: false,
  uuid: none,
};
