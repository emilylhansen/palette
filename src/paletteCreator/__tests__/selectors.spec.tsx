import { getFavoriteColorsById } from "src/paletteCreator/paletteCreator.selectors";
import { success, initial, pending, failure } from "@devexperts/remote-data-ts";

describe("getFavoriteColorsById", () => {
  const color1 = { name: "name-1", hex: "#ffffff", key: "1" };
  const color2 = { name: "name-2", hex: "#fffff1", key: "2" };
  const color3 = { name: "name-3", hex: "#fffff2", key: "3" };
  const color4 = { name: "name-4", hex: "#fffff3", key: "4" };

  const mockParameters = {
    favoriteColorIds: ["1", "2", "3"],
    colorsById: {
      "1": color1,
      "2": color2,
      "3": color3,
      "4": color4,
    },
  };

  describe("initial", () => {
    test("it should return an empty record", () => {
      const action = getFavoriteColorsById.resultFunc(
        initial,
        mockParameters.colorsById
      );

      const output = {};

      expect(action).toEqual(output);
    });
  });

  describe("pending", () => {
    test("it should return an empty record", () => {
      const action = getFavoriteColorsById.resultFunc(
        pending,
        mockParameters.colorsById
      );

      const output = {};

      expect(action).toEqual(output);
    });
  });

  describe("failure", () => {
    test("it should return an empty record", () => {
      const action = getFavoriteColorsById.resultFunc(
        failure("could not fetch data"),
        mockParameters.colorsById
      );

      const output = {};

      expect(action).toEqual(output);
    });
  });

  describe("success", () => {
    test("it should return a record of colors by id", () => {
      const action = getFavoriteColorsById.resultFunc(
        success(mockParameters.favoriteColorIds),
        mockParameters.colorsById
      );

      const output = {
        "1": color1,
        "2": color2,
        "3": color3,
      };

      expect(action).toEqual(output);
    });
  });
});
