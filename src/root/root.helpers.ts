import { PackAction } from "src/root/root.types";

export const makePackAction = <T, P, M>({
  type,
  payload,
  meta,
}: {
  type: T;
  payload: P;
  meta?: M;
}): PackAction<T, P, M> => ({
  type,
  promise: Promise.resolve(payload),
  // promise: Promise.resolve(new Promise(() => payload)),
  payload,
  meta,
});
