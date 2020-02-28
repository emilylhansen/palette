import { Option, none } from "fp-ts/lib/Option";
import { User } from "src/shared/shared.types";

export type AuthState = {
  currentUser: Option<User>;
};

export const initialState: AuthState = {
  currentUser: none,
};
