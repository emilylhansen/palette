import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { Color } from "src/shared/shared.types";
import { PaletteCreatorSidebar } from "src/paletteCreator/PaletteCreatorSidebar";
import Button from "@material-ui/core/Button";
import {
  PaletteTemplate,
  ColorAction,
} from "src/shared/components/PaletteTemplate";
import { getColors as getColorsSelector } from "src/paletteCreator/paletteCreator.selectors";
import {
  removeColor,
  addColor,
  setColor,
} from "src/paletteCreator/paletteCreator.actions";
import { ColorPicker } from "src/shared/components/ColorPicker";
import { IconButton } from "src/design/IconButton";
import faker from "faker";
import {
  getColors as getColorsAction,
  getPalettes,
  getUsers,
  getFavoriteColorIds,
} from "src/shared/shared.actions";

const PaletteCreatorBox = styled.div`
  display: flex;
  flex: 1;
  padding: 32px;
`;

const ContentBox = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const ContentTopBox = styled.div`
  flex: 1;
  display: flex;
  margin: 56px 32px;
`;

const FooterBox = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
`;

const AddBox = styled.div`
  display: flex;
  align-items: center;
  margin-left: 16px;
`;

const PaletteTemplateBox = styled.div`
  border: 1px dashed;
  flex: 1;
  border-radius: 6px;
`;

type Props = {};

const usePaletteCreator = (props: Props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPalettes());
    dispatch(getColorsAction());
    dispatch(getUsers());
    dispatch(getFavoriteColorIds());
    // dispatch(authenticate({ key: "" }));
  }, []);

  const colors = useSelector(getColorsSelector);

  const handleOnRemoveColor = (color: Color) =>
    dispatch(removeColor(color.key));

  const actions: Array<ColorAction> = [
    { iconName: "cancel", onClick: handleOnRemoveColor },
  ];

  const handleOnAddColor = (hex: string) => {
    dispatch(
      addColor({
        hex,
        key: faker.random.uuid(),
        name: faker.name.title(),
      })
    );
  };

  const handleOnSetColor = ({ key, hex }: { key: string; hex: string }) => {
    dispatch(
      setColor({
        key,
        hex,
      })
    );
  };

  return { colors, actions, handleOnAddColor, handleOnSetColor };
};

export const PaletteCreator = (props: Props) => {
  const state = usePaletteCreator(props);

  return (
    <PaletteCreatorBox>
      <PaletteCreatorSidebar handleOnAddColor={state.handleOnAddColor} />
      <ContentBox>
        <ContentTopBox>
          <PaletteTemplateBox>
            <PaletteTemplate
              colors={state.colors}
              enableColorDetails
              actions={state.actions}
              handleColor={state.handleOnSetColor}
            />
          </PaletteTemplateBox>
          <ColorPicker
            toggle={({ onToggle, isOpen }) => (
              <AddBox>
                <IconButton
                  color="secondary"
                  iconName={"add"}
                  onClick={onToggle}
                />
              </AddBox>
            )}
            handleColor={state.handleOnAddColor}
          />
        </ContentTopBox>
        <FooterBox>
          <Button>cancel</Button>
          <Button>create</Button>
        </FooterBox>
      </ContentBox>
    </PaletteCreatorBox>
  );
};
