import {
  Palette,
  Color,
  Tag,
  User,
  SharedState,
} from "src/shared/shared.types";
import faker from "faker";
import { range, lookup as lookupArray } from "fp-ts/lib/Array";
import { lookup as lookupRecord } from "fp-ts/lib/Record";
import { fold, map, getOrElse } from "fp-ts/lib/Option";
import { pipe } from "fp-ts/lib/pipeable";

const makeMockColor = ({ hex, key }: { hex: string; key: string }): Color => ({
  name: faker.name.title(),
  description: faker.lorem.sentences(),
  hex,
  private: faker.random.boolean(),
  key,
});

const makeMockTag = (key: string): Tag => ({
  name: faker.lorem.word(),
  key,
});

const mockTagIds = range(0, 100).map(faker.random.uuid);

export const tagsById = mockTagIds.reduce<Record<string, Tag>>(
  (acc, cur) => ({ ...acc, [cur]: makeMockTag(cur) }),
  {}
);

const getRandomItemInList = <T>(list: Array<T>) =>
  lookupArray<T>(Math.floor(Math.random() * list.length), list);

const pickNHexIdPairs = (n: number): Array<Record<string, string>> =>
  range(0, n).reduce<Array<Record<string, string>>>((acc, cur) => {
    const randomColorId = getRandomItemInList<string>(mockColorIds);

    return pipe(
      randomColorId,
      map(randomColorId_ =>
        pipe(
          lookupRecord(randomColorId_, hexByColorId),
          map(hex => [...acc, { [randomColorId_]: hex }]),
          getOrElse(() => acc)
        )
      ),
      getOrElse(() => acc)
    );
  }, []);

const makeMockPalette = ({
  key,
  authorId,
}: {
  key: string;
  authorId: string;
}): Palette => {
  const makeColors = () =>
    pickNHexIdPairs(faker.random.number(5)).reduce<Array<Color>>((acc, cur) => {
      return [
        ...acc,
        ...Object.entries(cur).map(([key, val]) =>
          makeMockColor({ hex: val, key })
        ),
      ];
    }, []);

  const makeTags = () =>
    range(0, faker.random.number(5)).reduce<Array<Tag>>((acc, cur) => {
      const g = pipe(
        getRandomItemInList(mockTagIds),
        map(tagId => {
          return pipe(
            lookupRecord(tagId, tagsById),
            map(tag => {
              return [...acc, tag];
            }),
            getOrElse(() => acc)
          );
        }),
        getOrElse(() => acc)
      );
      return g;
    }, []);

  return {
    name: faker.name.title(),
    description: faker.lorem.sentences(),
    colors: makeColors(),
    private: faker.random.boolean(),
    authorId,
    key,
    tags: makeTags(),
  };
};

const makeMockUser = (key: string): User => ({
  name: faker.name.findName(),
  description: faker.lorem.paragraph(),
  avatar: faker.image.avatar(),
  key,
  email: faker.internet.email(),
  createOn: faker.date.past(),
});

const generateRandomColor = () =>
  Math.floor(Math.random() * 16777215).toString(16);

const mockPaletteIds = range(0, 100).map(faker.random.uuid);
const mockColorIds = range(0, 100).map(faker.random.uuid);
const mockHexColors = range(0, mockColorIds.length).map(generateRandomColor);
const mockUserIds = range(0, 100).map(faker.random.uuid);

const hexByColorId = mockColorIds.reduce<Record<string, string>>(
  (acc, cur, idx) => ({ ...acc, [cur]: mockHexColors[idx] }),
  {}
);

export const mockPalettes = mockPaletteIds.reduce<Array<Palette>>(
  (acc, cur) => {
    const authorIdO = getRandomItemInList(mockUserIds);

    return pipe(
      authorIdO,
      map(authorId => [...acc, makeMockPalette({ key: cur, authorId })]),
      getOrElse(() => acc)
    );
  },
  []
);

export const mockUsersById: SharedState["usersById"] = mockUserIds.reduce<
  SharedState["usersById"]
>((acc, cur) => ({ ...acc, [cur]: makeMockUser(cur) }), {});

export const mockPalettesById: SharedState["palettesById"] = mockPalettes.reduce<
  SharedState["palettesById"]
>((acc, cur) => ({ ...acc, [cur.key]: cur }), {});

export const mockColorsById: SharedState["colorsById"] = Object.entries(
  hexByColorId
).reduce<SharedState["colorsById"]>(
  (acc, [key, val]) => ({ ...acc, [key]: makeMockColor({ key, hex: val }) }),
  {}
);
