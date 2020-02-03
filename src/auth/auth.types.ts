import { Option, none } from "fp-ts/lib/Option";

export type AuthReducerState = {
  count: number;
  isAuthenticated: boolean;
  uuid: Option<string>;
};

export const initialState: AuthReducerState = {
  count: 0,
  isAuthenticated: false,
  uuid: none,
};
