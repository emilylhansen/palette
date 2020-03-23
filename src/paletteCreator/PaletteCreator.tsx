import { chain, fold, fromNullable, getOrElse, map } from "fp-ts/lib/Option";
import { pipe } from "fp-ts/lib/pipeable";
import { lookup } from "fp-ts/lib/Record";
import React from "react";
import { withTypes } from "react-final-form";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserId } from "src/auth/auth.selectors";
import { Button } from "src/design/Button";
import { GutterSize } from "src/design/design.helpers";
import { validate } from "src/paletteCreator/paletteCreator.helpers";
import {
  makeInitialValuesCreate,
  makeInitialValuesEdit,
  Values,
} from "src/paletteCreator/paletteCreator.types";
import { PaletteCreatorPalette } from "src/paletteCreator/PaletteCreatorPalette";
import { PaletteCreatorSidebar } from "src/paletteCreator/PaletteCreatorSidebar";
import { history } from "src/root/App";
import { makeHomeRoute } from "src/root/root.routes";
import { Medias } from "src/root/root.styles";
import { createPalette } from "src/shared/shared.actions";
import { getPalettesById } from "src/shared/shared.selectors";
import { Palette } from "src/shared/shared.types";
import styled from "styled-components";
import { v5 as uuidv5 } from "uuid";

const PaletteCreatorBox = styled.div`
  display: flex;
  flex: 1;

  @media (max-width: ${Medias.EXTRA_SMALL.maxWidth}px) {
    margin: ${Medias.EXTRA_SMALL.margins}px;
    flex-direction: column;
  }

  @media (min-width: ${Medias.SMALL.minWidth}px) {
    margin: ${Medias.SMALL.margins}px;
    flex-direction: column;
  }

  @media (min-width: ${Medias.MEDIUM.minWidth}px) {
    margin: ${Medias.MEDIUM.margins}px;
    flex-direction: row;
  }

  @media (min-width: ${Medias.LARGE.minWidth}px) {
    margin: ${Medias.LARGE.margins}px;
    flex-direction: row;
  }

  @media (min-width: ${Medias.EXTRA_LARGE.minWidth}px) {
    margin: ${Medias.EXTRA_LARGE.margins}px;
    flex-direction: row;
  }
`;

const ContentBox = styled.div`
  display: flex;
  flex-flow: column;

  @media (max-width: ${Medias.EXTRA_SMALL.maxWidth}px) {
    margin: ${Medias.EXTRA_LARGE.margins}px 0 0 0;
    flex: 2;
  }

  @media (min-width: ${Medias.SMALL.minWidth}px) {
    margin: ${Medias.EXTRA_LARGE.margins}px 0 0 0;
    flex: 2;
  }

  @media (min-width: ${Medias.MEDIUM.minWidth}px) {
    margin: 0 0 0 ${Medias.EXTRA_LARGE.margins * 2}px;
    flex: 1;
  }

  @media (min-width: ${Medias.LARGE.minWidth}px) {
    margin: 0 0 0 ${Medias.EXTRA_LARGE.margins * 2}px;
    flex: 1;
  }

  @media (min-width: ${Medias.EXTRA_LARGE.minWidth}px) {
    margin: 0 0 0 ${Medias.EXTRA_LARGE.margins * 2}px;
    flex: 1;
  }
`;

const FooterBox = styled.div`
  display: flex;
  justify-content: flex-end;

  @media (max-width: ${Medias.EXTRA_SMALL.maxWidth}px) {
    margin-top: ${Medias.EXTRA_LARGE.margins}px;
  }

  @media (min-width: ${Medias.SMALL.minWidth}px) {
    margin-top: ${Medias.EXTRA_LARGE.margins}px;
  }

  @media (min-width: ${Medias.MEDIUM.minWidth}px) {
    margin-top: ${Medias.EXTRA_LARGE.margins}px;
  }

  @media (min-width: ${Medias.LARGE.minWidth}px) {
    margin-top: ${Medias.EXTRA_LARGE.margins}px;
  }

  @media (min-width: ${Medias.EXTRA_LARGE.minWidth}px) {
    margin-top: ${Medias.EXTRA_LARGE.margins}px;
  }
`;

const formatFormValues = ({
  values,
  userId,
}: {
  values: Values;
  userId: string;
}): Palette => {
  return {
    name: values.name,
    description: values.description,
    colors: values.colors,
    private: true,
    authorId: userId,
    key: uuidv5.DNS,
    tags: values.tags,
  };
};

type Props = { paletteId?: string };

const { Form } = withTypes<Values>();

const usePaletteCreator = (props: Props) => {
  const dispatch = useDispatch();

  const palettesById = useSelector(getPalettesById);
  const currentUserId = useSelector(getCurrentUserId);

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
    pipe(
      currentUserId,
      fold(
        () => null,
        currentUserId_ => {
          const formattedValues = formatFormValues({
            values,
            userId: currentUserId_,
          });

          dispatch(createPalette({ palette: formattedValues }));
          history.push(makeHomeRoute());
        }
      )
    );
  };

  const submitLabel: string = pipe(
    palette,
    map(() => "update"),
    getOrElse(() => "create")
  );

  const onCancel = () => history.push(makeHomeRoute());

  return {
    onSubmit,
    initialValues,
    submitLabel,
    onCancel,
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
              <Button
                color="secondary"
                gutterRight={GutterSize.Medium}
                onClick={state.onCancel}
              >
                cancel
              </Button>
              <Button
                type="submit"
                onClick={handleSubmit}
                color="primary"
                variant="contained"
              >
                {state.submitLabel}
              </Button>
            </FooterBox>
          </ContentBox>
        </PaletteCreatorBox>
      )}
    ></Form>
  );
};
