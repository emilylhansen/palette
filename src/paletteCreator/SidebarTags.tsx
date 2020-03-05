import CardContent from "@material-ui/core/CardContent";
import Chip from "@material-ui/core/Chip";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { getOrElse, map, none, Option, some } from "fp-ts/lib/Option";
import { pipe } from "fp-ts/lib/pipeable";
import React from "react";
import { Field, useForm } from "react-final-form";
import { IconButton } from "src/design/IconButton";
import { fieldNames } from "src/paletteCreator/paletteCreator.constants";
import { makeNewTag } from "src/paletteCreator/paletteCreator.helpers";
import { Values } from "src/paletteCreator/paletteCreator.types";
import { Tag } from "src/shared/shared.types";
import styled, { css } from "styled-components";

const MAX_WIDTH = 268;

const CHIP_MIN_WIDTH = 40;

const CHAR_MIN = 3;

const PX_PER_CHAR = 6;

const useStyles = makeStyles({
  underline: {
    "&&&:before": {
      borderBottom: "none",
    },
    "&&:after": {
      borderBottom: "none",
    },
  },
});

const TagsBox = styled.div`
  display: flex;
  max-width: ${MAX_WIDTH}px;
  flex-flow: row wrap;

  > div {
    margin: 0 8px 8px 0;
    max-width: ${MAX_WIDTH}px;
  }
`;

const TagInputBox = styled.div`
  position: relative;
  height: 32px;
  max-width: ${MAX_WIDTH}px;
`;

const TagInputFormBox = styled.form<{ width: number }>`
  bottom: 1px;
  padding: 0px 12px;
  min-width: 12px;
  display: flex;
  max-width: ${MAX_WIDTH}px;
  position: absolute;
  left: 0;
  right: 0;

  input {
    font-size: 0.8125rem;
    color: #fff;
  }

  > div {
    flex: 1;
  }
`;

const ChipBox = styled.div<{ width: number }>`
  color: #fff;
  background-color: #3f51b5;
  border: none;
  cursor: default;
  height: 32px;
  border-radius: 16px;
  max-width: ${MAX_WIDTH}px;
  position: relative;

  ${({ width }) =>
    css`
      width: ${width}px;
    `}
`;

const TagInput = ({
  value,
  onAddTag,
  setTagValue,
}: {
  value: string;
  onAddTag: (e: React.FormEvent<HTMLFormElement>) => void;
  setTagValue: (value: string) => void;
}) => {
  const classes = useStyles();

  const width =
    value.length > CHAR_MIN
      ? (value.length - CHAR_MIN) * PX_PER_CHAR + CHIP_MIN_WIDTH
      : CHIP_MIN_WIDTH;

  return (
    <TagInputBox>
      <ChipBox width={width}>
        <TagInputFormBox onSubmit={onAddTag} width={width}>
          <TextField
            id="standard-size-small"
            size="small"
            value={value}
            onChange={e => setTagValue(e.target.value)}
            InputProps={{ classes }}
            autoFocus
          />
        </TagInputFormBox>
      </ChipBox>
    </TagInputBox>
  );
};

type Props = {};

const useSidebarTags = ({}: Props) => {
  const form = useForm();
  const formState = form.getState().values as Values;
  const tags = formState["tags"];

  const onAddTag = (value: string) => {
    form.change(fieldNames.tags, [...tags, makeNewTag(value)]);
    form.change(fieldNames.newTag, none);
  };

  const onDeleteTag = (key: string) =>
    form.change(
      fieldNames.tags,
      tags.filter(t_ => t_.key !== key)
    );

  const initializeNewTag = () => some("");

  return {
    tags,
    form,
    onAddTag,
    onDeleteTag,
    initializeNewTag,
  };
};

export const SidebarTags = (props: Props) => {
  const state = useSidebarTags(props);

  return (
    <CardContent>
      <Typography gutterBottom variant="h5" component="h2">
        Tags
      </Typography>
      <TagsBox>
        {state.tags.map((t, idx) => (
          <Field<Tag>
            name={`${fieldNames.tags}-${t.key}-${idx}`}
            key={`${fieldNames.tags}-${t.key}-${idx}`}
          >
            {({ input, meta }) => (
              <Chip
                label={t.value}
                color="primary"
                onDelete={() => state.onDeleteTag(t.key)}
              />
            )}
          </Field>
        ))}

        <Field<Option<string>> name={fieldNames.newTag} key={fieldNames.newTag}>
          {({ input, meta }) => {
            return pipe(
              input.value,
              map(value => {
                return (
                  <TagInput
                    value={value}
                    onAddTag={e => state.onAddTag(value)}
                    setTagValue={v => input.onChange(some(v))}
                  />
                );
              }),
              getOrElse(() => (
                <IconButton
                  key={"add-button"}
                  color="secondary"
                  iconName={"add"}
                  size="small"
                  onClick={() => input.onChange(state.initializeNewTag())}
                />
              ))
            );
          }}
        </Field>
      </TagsBox>
    </CardContent>
  );
};
