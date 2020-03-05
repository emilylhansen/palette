import Button from "@material-ui/core/Button";
import React, { useEffect } from "react";
import { withTypes } from "react-final-form";
import { useDispatch, useSelector } from "react-redux";
import { validate } from "src/paletteCreator/paletteCreator.helpers";
import {
  makeInitialValuesCreate,
  makeInitialValuesEdit,
  Values,
} from "src/paletteCreator/paletteCreator.types";
import { PaletteCreatorPalette } from "src/paletteCreator/PaletteCreatorPalette";
import { PaletteCreatorSidebar } from "src/paletteCreator/PaletteCreatorSidebar";
import {
  getColors,
  getFavoriteColorIds,
  getPalettes,
  getUsers,
} from "src/shared/shared.actions";
import { getPalettesById } from "src/shared/shared.selectors";
import styled from "styled-components";
import { mockPaletteIds } from "src/shared/mockData";
import { lookup } from "fp-ts/lib/Record";
import { pipe } from "fp-ts/lib/pipeable";
import { map, getOrElse, chain, fromNullable } from "fp-ts/lib/Option";

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

type Props = { paletteId?: string };

const { Form } = withTypes<Values>();

const usePaletteCreator = (props: Props) => {
  const palettesById = useSelector(getPalettesById);

  const palette = pipe(
    fromNullable(props.paletteId),
    chain(paletteId_ => lookup(paletteId_, palettesById))
  );

  const initialValues = pipe(
    palette,
    map(p => makeInitialValuesEdit(p)),
    getOrElse(() => makeInitialValuesCreate())
  );

  const onSubmit = (values: Values) => {
    console.log("submitted", values);
  };

  const submitLabel: string = pipe(
    palette,
    map(() => "update"),
    getOrElse(() => "create")
  );

  return {
    onSubmit,
    initialValues,
    submitLabel,
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
                {state.submitLabel}
              </Button>
            </FooterBox>
          </ContentBox>
        </PaletteCreatorBox>
      )}
    ></Form>
  );
};
