import { localStorage } from "src/root/App";
import { RootState, ValueOf } from "src/root/root.types";

export const localStorageSetItem = ({
  key,
  value,
}: {
  key: keyof RootState;
  value: ValueOf<RootState>;
}): void => {
  localStorage.setItem(key, value.toString());
};

export const localStorageGetItem = () => {};
export const localStorageRemoveItem = () => {};
export const localStorageClear = () => {};
