import React, { useState } from "react";
import {
  connect,
  ConnectedProps,
  Provider,
  useSelector,
  useDispatch,
} from "react-redux";
import { createStore, Dispatch } from "redux";
import styled, { css } from "styled-components";
import { PaletteOverviewCard } from "src/shared/components/PaletteOverviewCard";
import { PaletteTileCard } from "src/shared/components/PaletteTileCard";
import { range } from "fp-ts/lib/Array";
import { mockPalettes } from "src/shared/mockData";
import { Overlay } from "src/design/Overlay";
import { Option, none, some, isSome, map, getOrElse } from "fp-ts/lib/Option";
import { Palette } from "src/shared/shared.types";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import { IconButton } from "src/design/IconButton";
import { Icon } from "src/design/Icon";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import { PaletteTemplate } from "src/shared/components/PaletteTemplate";
import Chip from "@material-ui/core/Chip";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { SidebarControls } from "src/paletteCreator/SidebarControls";
import { getTags } from "src/paletteCreator/paletteCreator.selectors";
import { removeTag, addTag } from "src/paletteCreator/paletteCreator.actions";
import { pipe } from "fp-ts/lib/pipeable";
import { makeStyles } from "@material-ui/core/styles";

const MAX_WIDTH = 268;

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
  setTagValue: (value: Option<string>) => void;
}) => {
  const classes = useStyles();

  const width = value.length > 3 ? (value.length - 3) * 6 + 40 : 40;

  return (
    <TagInputBox>
      <ChipBox width={width}>
        <TagInputFormBox onSubmit={onAddTag} width={width}>
          <TextField
            id="standard-size-small"
            size="small"
            value={value}
            onChange={e => setTagValue(some(e.target.value))}
            InputProps={{ classes }}
          />
        </TagInputFormBox>
      </ChipBox>
    </TagInputBox>
  );
};

type Props = {};

const useSidebarTags = ({}: Props) => {
  const [tagValue, setTagValue] = useState<Option<string>>(none);

  const dispatch = useDispatch();

  const tags = useSelector(getTags);

  const handleOnAddTag = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    pipe(
      tagValue,
      map(t => {
        dispatch(addTag(t));
        setTagValue(none);
      }),
      getOrElse(() => null)
    );
  };

  const handleOnRemoveTag = (key: string) => dispatch(removeTag(key));

  const initializeNewTag = () => setTagValue(some(""));

  return {
    tags,
    handleOnRemoveTag,
    handleOnAddTag,
    initializeNewTag,
    tagValue,
    setTagValue,
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
        {state.tags.map(t => (
          <Chip
            key={t.key}
            label={t.value}
            clickable
            color="primary"
            onDelete={() => state.handleOnRemoveTag(t.key)}
            deleteIcon={<Icon iconName="cancel" />}
          />
        ))}
        {pipe(
          state.tagValue,
          map(tagValue_ => (
            <TagInput
              value={tagValue_}
              onAddTag={state.handleOnAddTag}
              setTagValue={state.setTagValue}
            />
          )),
          getOrElse(() => (
            <IconButton
              key={"add-button"}
              color="secondary"
              size="small"
              iconName={"add"}
              onClick={state.initializeNewTag}
            />
          ))
        )}
      </TagsBox>
    </CardContent>
  );
};
