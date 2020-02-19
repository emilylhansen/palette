import { Option, none } from "fp-ts/lib/Option";
import { User } from "src/root/root.types";

export type AuthReducerState = {
  currentUser: Option<User>;
};

export const initialState: AuthReducerState = {
  currentUser: none,
};
