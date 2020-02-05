import {
  Palette,
  Color,
  Tag,
} from "/Users/emilyhansen/Desktop/palette-app/src/root/root.types";
import faker from "faker";
import { range } from "fp-ts/lib/Array";

const hexColors = ["ffb6b9", "fae3d9", "bbded6", "8ac6d1"];

const makeMockColor = ({ hex }: { hex: string }): Color => ({
  name: faker.name.title(),
  description: faker.lorem.sentences(),
  hex,
  private: faker.random.boolean(),
  key: faker.random.uuid(),
});

const makeMockTag = (): Tag => ({
  name: faker.lorem.word(),
  key: faker.random.uuid(),
});

const makeMockPalette = (): Palette => ({
  name: faker.name.title(),
  description: faker.lorem.sentences(),
  colors: hexColors.map(hex => makeMockColor({ hex })),
  private: faker.random.boolean(),
  authorId: faker.random.uuid(),
  key: faker.random.uuid(),
  tags: range(0, 3).map(_ => makeMockTag()),
});

export const mockPalettes = range(0, 40).map(_ => makeMockPalette());
