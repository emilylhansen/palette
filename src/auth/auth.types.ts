import { Option, none, some } from "fp-ts/lib/Option";
import { User } from "src/shared/shared.types";
import { mockUsersById } from "src/shared/mockData";
import {
  failure,
  initial,
  pending,
  RemoteData,
  success,
} from "@devexperts/remote-data-ts";

export type AuthState = {
  currentUser: RemoteData<string, Option<User>>;
};

export const initialState: AuthState = {
  currentUser: success(none),
};
