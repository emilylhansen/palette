export const isNull = <T>(x: null | undefined | T): x is null | undefined =>
  x === null;
