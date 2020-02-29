import { Option, none, some } from "fp-ts/lib/Option";
import { User } from "src/shared/shared.types";
import { mockUsersById } from "src/shared/mockData";

export type AuthState = {
  currentUser: Option<User>;
};

export const initialState: AuthState = {
  currentUser: some(Object.values(mockUsersById)[0]),
};
