import { GetRandomObject } from "src/shared/shared.actions";

export const isNil = <T>(x: null | undefined | T): x is null | undefined =>
  x === null || x === undefined;
