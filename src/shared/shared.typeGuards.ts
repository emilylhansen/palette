import { GetRandomObject } from "src/shared/shared.actions";
import { isEmpty } from "fp-ts/lib/ReadonlyRecord";

export const isNil = <T>(x: null | undefined | T): x is null | undefined =>
  x === null || x === undefined;

export const isFalsy = <T>(x: false | null | undefined | 0 | "" | T): boolean =>
  (typeof x === "number" && Number.isNaN(x)) ||
  x === false ||
  x === null ||
  x === undefined ||
  x === 0 ||
  x === "";

export const isEmptyString = (value: string): boolean => value === "";

export const isBlankString = (value: string): boolean =>
  value.split("").every(e => e === " ");

export const isEmptyOrBlankString = (value: string): boolean =>
  isEmptyString(value) || isBlankString(value);
