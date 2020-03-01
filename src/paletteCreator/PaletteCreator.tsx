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
import { Field, withTypes } from "react-final-form";
import { Option, none, some } from "fp-ts/lib/Option";
import { isEmpty } from "fp-ts/lib/Array";
import { isEmptyOrBlankString } from "src/paletteCreator/paletteCreator.helpers";
import { Lens } from "monocle-ts";
import { initialState } from "src/paletteCreator/paletteCreator.types";

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

type Values = {
  name: string;
  description: string;
  colors: Array<Color>;
};

type Errors = Record<keyof Values, string>;

type Props = {};

const { Form } = withTypes<Values>();

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

  const handleOnSubmit = (values: Values) => {
    debugger;
    console.log("submitted", values);
  };

  const validate = (values: Values) => {
    debugger;
    let errors: Errors = {
      name: "",
      description: "",
      colors: "",
    };

    if (isEmptyOrBlankString(values.name)) {
      errors = Lens.fromProp<Errors>()("name").modify(_ => "Required")(errors);
    }

    if (isEmptyOrBlankString(values.description)) {
      errors = Lens.fromProp<Errors>()("description").modify(_ => "Required")(
        errors
      );
    }

    if (isEmpty(values.colors)) {
      errors = Lens.fromProp<Errors>()("colors").modify(
        _ => "Must contain at least one color"
      )(errors);
    }
    console.log({ errors, values });
    return errors;
  };

  const initialValues: Values = { name: "", description: "", colors: [] };

  return {
    colors,
    actions,
    handleOnAddColor,
    handleOnSetColor,
    handleOnSubmit,
    validate,
    initialValues,
  };
};

export const PaletteCreator = (props: Props) => {
  const state = usePaletteCreator(props);

  return (
    <Form
      onSubmit={state.handleOnSubmit}
      validate={state.validate}
      initialValues={state.initialValues}
      render={({ handleSubmit, form }) => (
        <form onSubmit={handleSubmit}>
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
                <Button type="submit">create</Button>
              </FooterBox>
            </ContentBox>
          </PaletteCreatorBox>
        </form>
      )}
    ></Form>
  );
};
