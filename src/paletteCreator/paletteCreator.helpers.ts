import { Tag } from "src/shared/shared.types";
import { v4 as uuidv4 } from "uuid";

export const makeNewTag = (value: string): Tag => ({ value, key: uuidv4() });
