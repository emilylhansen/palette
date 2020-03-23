import CardContent from "@material-ui/core/CardContent";
import Chip from "@material-ui/core/Chip";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { getOrElse, map, none, Option, some } from "fp-ts/lib/Option";
import { pipe } from "fp-ts/lib/pipeable";
import React, { useState } from "react";
import { Field, useForm } from "react-final-form";
import { IconButton } from "src/design/IconButton";
import { fieldNames } from "src/paletteCreator/paletteCreator.constants";
import { makeNewTag } from "src/paletteCreator/paletteCreator.helpers";
import { Values } from "src/paletteCreator/paletteCreator.types";
import { Tag } from "src/shared/shared.types";
import { css } from "styled-components";
import { SectionHeader } from "src/paletteCreator/paletteCreator.styles";
import { styled } from "src/root/root.theme";
import {
  isEmptyString,
  isFalsy,
  isEmptyOrBlankString,
} from "src/shared/shared.typeGuards";

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

const ChipBox = styled.div<{ width: number; error?: boolean }>`
  color: #fff;
  border: none;
  cursor: default;
  height: 32px;
  border-radius: 16px;
  max-width: ${MAX_WIDTH}px;
  position: relative;

  ${({ width, error, theme }) =>
    css`
      background-color: ${theme.mui.palette.primary.main};
      width: ${width}px;

      ${!isFalsy(error) &&
        css`
          border: 1px solid ${theme.defaultMui.palette.error.main};
        `}
    `}
`;

const TagInput = ({
  value,
  onAddTag,
  setTagValue,
  onBlurTag,
  hasError,
}: {
  value: string;
  onAddTag: (e: React.FormEvent<HTMLFormElement>) => void;
  setTagValue: (value: string) => void;
  onBlurTag: (
    e: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  hasError: boolean;
}) => {
  const classes = useStyles();

  /** TODO: this needs work */
  const width =
    value.length > CHAR_MIN
      ? (value.length - CHAR_MIN) * PX_PER_CHAR + CHIP_MIN_WIDTH
      : CHIP_MIN_WIDTH;

  return (
    <TagInputBox>
      <ChipBox width={width} error={hasError}>
        <TagInputFormBox onSubmit={onAddTag} width={width}>
          <TextField
            id="standard-size-small"
            size="small"
            value={value}
            onChange={e => setTagValue(e.target.value)}
            InputProps={{ classes }}
            autoFocus
            onBlur={onBlurTag}
          />
        </TagInputFormBox>
      </ChipBox>
    </TagInputBox>
  );
};

type Props = {};

const useSidebarTags = ({}: Props) => {
  const [hasError, setHasError] = useState<boolean>(false);

  const form = useForm();
  const formState = form.getState().values as Values;
  const tags = formState["tags"];

  const resetNewTag = () => form.change(fieldNames.newTag, none);

  const onAddTag = (value: string) => {
    const isInvalidValue = isEmptyOrBlankString(value);

    if (isInvalidValue) {
      setHasError(true);
    } else {
      setHasError(false);
      form.change(fieldNames.tags, [...tags, makeNewTag(value)]);
      resetNewTag();
    }
  };

  const onDeleteTag = (key: string) =>
    form.change(
      fieldNames.tags,
      tags.filter(t_ => t_.key !== key)
    );

  const onBlurTag = (value: string) => {
    const isInvalidValue = isEmptyOrBlankString(value);

    isInvalidValue && resetNewTag();
  };

  const initializeNewTag = () => some("");

  return {
    hasError,
    tags,
    form,
    onAddTag,
    onDeleteTag,
    onBlurTag,
    initializeNewTag,
  };
};

export const SidebarTags = (props: Props) => {
  const state = useSidebarTags(props);

  return (
    <CardContent>
      <SectionHeader>Tags</SectionHeader>

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
                    onAddTag={e => {
                      e.preventDefault();
                      state.onAddTag(value);
                    }}
                    setTagValue={v => input.onChange(some(v))}
                    onBlurTag={e => state.onBlurTag(value)}
                    hasError={state.hasError}
                  />
                );
              }),
              getOrElse(() => (
                <IconButton
                  key={"add-button"}
                  color="secondary"
                  size="small"
                  iconName={"add"}
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
