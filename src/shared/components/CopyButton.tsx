import Tooltip from "@material-ui/core/Tooltip";
import React, { useState, useEffect } from "react";
import { Option, some, none, map, getOrElse } from "fp-ts/lib/Option";
import { pipe } from "fp-ts/lib/pipeable";
import IconButton from "@material-ui/core/IconButton";
import { Icon } from "@material-ui/core";

type Props = {
  value: string;
};

const useCopyButton = (props: Props) => {
  const [copySuccess, setCopySuccess] = useState<Option<boolean>>(none);

  useEffect(() => {
    setCopySuccess(none);
  }, [props.value]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(props.value).then(
      () => {
        setCopySuccess(some(true));

        const timer = setTimeout(() => {
          setCopySuccess(none);
        }, 2000);

        return () => clearTimeout(timer);
      },
      err => {
        setCopySuccess(some(false));
      }
    );
  };

  const title = pipe(
    copySuccess,
    map(c => (c ? "Copied" : "Failed to Copy")),
    getOrElse(() => "")
  );

  return { copyToClipboard, title, setCopySuccess };
};

export const CopyButton = (props: Props) => {
  const state = useCopyButton(props);

  return (
    <Tooltip
      title={state.title}
      PopperProps={{
        disablePortal: true,
      }}
      onClose={() => state.setCopySuccess(none)}
      open={state.title === "Copied"}
      disableFocusListener
      disableHoverListener
      disableTouchListener
      placement="bottom"
    >
      <IconButton color="secondary" onClick={state.copyToClipboard}>
        <Icon>{"file_copy"}</Icon>
      </IconButton>
    </Tooltip>
  );
};
