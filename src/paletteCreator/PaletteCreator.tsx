import Button from "@material-ui/core/Button";
import React, { useEffect } from "react";
import { withTypes } from "react-final-form";
import { useDispatch } from "react-redux";
import { validate } from "src/paletteCreator/paletteCreator.helpers";
import { initialValues, Values } from "src/paletteCreator/paletteCreator.types";
import { PaletteCreatorPalette } from "src/paletteCreator/PaletteCreatorPalette";
import { PaletteCreatorSidebar } from "src/paletteCreator/PaletteCreatorSidebar";
import {
  getColors,
  getFavoriteColorIds,
  getPalettes,
  getUsers,
} from "src/shared/shared.actions";
import styled from "styled-components";

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

const FooterBox = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
`;

type Props = {};

const { Form } = withTypes<Values>();

const usePaletteCreator = (props: Props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPalettes());
    dispatch(getColors());
    dispatch(getUsers());
    dispatch(getFavoriteColorIds());
    // dispatch(authenticate({ key: "" }));
  }, []);

  const onSubmit = (values: Values) => {
    console.log("submitted", values);
  };

  return {
    onSubmit,
    initialValues,
  };
};

export const PaletteCreator = (props: Props) => {
  const state = usePaletteCreator(props);

  return (
    <Form
      onSubmit={state.onSubmit}
      validate={validate}
      initialValues={state.initialValues}
      render={({ handleSubmit, form }) => (
        <PaletteCreatorBox>
          <PaletteCreatorSidebar />
          <ContentBox>
            <PaletteCreatorPalette />
            <FooterBox>
              <Button>cancel</Button>
              <Button type="submit" onClick={handleSubmit}>
                create
              </Button>
            </FooterBox>
          </ContentBox>
        </PaletteCreatorBox>
      )}
    ></Form>
  );
};
