import React, { useState, ReactNode } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import {
  Option,
  none,
  some,
  map,
  getOrElse,
  fromNullable,
  toUndefined,
} from "fp-ts/lib/Option";
import { IconButton } from "src/design/IconButton";
import { addColor } from "src/paletteCreator/paletteCreator.actions";
import { ChromePicker, ColorResult } from "react-color";
import faker from "faker";
import { pipe } from "fp-ts/lib/pipeable";

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
  const [selectedColor, setColor] = useState<Option<string>>(
    fromNullable(props.color)
  );

  const dispatch = useDispatch();

  const handleOnClose = () => {
    setIsOpen(false);
    pipe(
      selectedColor,
      map((c: string) => {
        props.handleColor(c.replace(/#/g, ""));
      }),
      getOrElse(() => null)
    );
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
            color={toUndefined(state.selectedColor)}
            onChange={c => state.setColor(some(c.hex))}
          />
        </PopOver>
      )}
    </ColorPickerBox>
  );
};
