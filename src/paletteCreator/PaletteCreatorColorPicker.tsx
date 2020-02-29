import React, { useState } from "react";
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

const PaletteCreatorColorPickerBox = styled.div`
  display: flex;
`;

const AddBox = styled.div`
  display: flex;
  align-items: center;
  margin-left: 16px;
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

type Props = {
  color?: string;
};

export const PaletteCreatorColorPicker = ({ color }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedColor, setColor] = useState<Option<string>>(
    fromNullable(color)
  );

  const dispatch = useDispatch();

  const handleOnClose = () => {
    setIsOpen(false);
    pipe(
      selectedColor,
      map((c: string) => {
        dispatch(
          addColor({
            hex: c.replace(/#/g, ""),
            key: faker.random.uuid(),
            name: faker.name.title(),
          })
        );
      }),
      getOrElse(() => null)
    );
  };

  return (
    <PaletteCreatorColorPickerBox>
      <AddBox>
        <IconButton
          color="secondary"
          iconName={"add"}
          onClick={() => setIsOpen(!isOpen)}
        />
      </AddBox>
      {isOpen && (
        <PopOver>
          <Cover onClick={handleOnClose} />
          <ChromePicker
            color={toUndefined(selectedColor)}
            onChange={c => setColor(some(c.hex))}
          />
        </PopOver>
      )}
    </PaletteCreatorColorPickerBox>
  );
};
