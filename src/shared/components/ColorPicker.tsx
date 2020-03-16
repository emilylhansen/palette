import {
  fromNullable,
  getOrElse,
  map,
  Option,
  some,
  toUndefined,
} from "fp-ts/lib/Option";
import { pipe } from "fp-ts/lib/pipeable";
import React, { ReactNode, useState } from "react";
import { ChromePicker } from "react-color";
import styled from "styled-components";

const INITIAL_COLOR = "#F09C9C";

const ColorPickerBox = styled.div`
  display: flex;
  height: 100%;
`;

const PopOver = styled.div`
  position: absolute;
  z-index: 2;
  right: 32px;
`;

const Cover = styled.div`
  position: fixed;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
`;

export type Props = {
  color?: string;
  toggle: ({
    onToggle,
    isOpen,
  }: {
    onToggle: () => void;
    isOpen: boolean;
  }) => ReactNode;
  handleColor: (hex: string) => void;
};

const useColorPicker = (props: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedColor, setColor] = useState<string>(
    pipe(
      fromNullable(props.color),
      getOrElse(() => INITIAL_COLOR)
    )
  );

  const handleOnClose = () => {
    setIsOpen(false);
    props.handleColor(selectedColor.replace(/#/g, ""));
  };

  return { isOpen, setIsOpen, selectedColor, setColor, handleOnClose };
};

export const ColorPicker = (props: Props) => {
  const state = useColorPicker(props);

  return (
    <ColorPickerBox>
      {props.toggle({
        onToggle: () => state.setIsOpen(!state.isOpen),
        isOpen: state.isOpen,
      })}
      {state.isOpen && (
        <PopOver>
          <Cover onClick={state.handleOnClose} />
          <ChromePicker
            color={state.selectedColor}
            onChange={c => state.setColor(c.hex)}
          />
        </PopOver>
      )}
    </ColorPickerBox>
  );
};
