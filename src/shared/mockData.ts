import faker from "faker";
import { lookup as lookupArray, range, takeLeft } from "fp-ts/lib/Array";
import { fold, getOrElse, map } from "fp-ts/lib/Option";
import { pipe } from "fp-ts/lib/pipeable";
import { lookup as lookupRecord } from "fp-ts/lib/Record";
import {
  Color,
  Palette,
  SharedState,
  Tag,
  User,
} from "src/shared/shared.types";

export const COUNT = 15;

const makeMockColor = ({ hex, key }: { hex: string; key: string }): Color => ({
  name: faker.name.title(),
  hex,
  key,
});

const makeMockTag = (key: string): Tag => ({
  value: faker.lorem.word(),
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

export const makeTags = (): Array<Tag> =>
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

const generateRandomColor = (): string =>
  Math.floor(Math.random() * 16777215).toString(16);

export const mockPaletteIds = range(0, 100).map(faker.random.uuid);

const mockColorIds = range(0, 100).map(faker.random.uuid);

const mockHexColors = range(0, mockColorIds.length).map(() => {
  const randomColor = generateRandomColor();

  return `#${randomColor.length === 6 ? randomColor : "F09C9C"}`;
});

const mockUserIds = range(0, 100).map(faker.random.uuid);

export const mockFavoriteColorIds = takeLeft(Math.floor(COUNT / 3))(
  mockColorIds
);

export const mockFavoritePaletteIds = takeLeft(Math.floor(COUNT / 3))(
  mockPaletteIds
);

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

export const mockCurrentUser = Object.values(mockUsersById)[0];

export const mockPalettesById: SharedState["palettesById"] = mockPalettes.reduce<
  SharedState["palettesById"]
>((acc, cur) => ({ ...acc, [cur.key]: cur }), {});

export const mockColorsById: SharedState["colorsById"] = Object.entries(
  hexByColorId
).reduce<SharedState["colorsById"]>(
  (acc, [key, val]) => ({ ...acc, [key]: makeMockColor({ key, hex: val }) }),
  {}
);
