import { Button } from "src/design/Button";
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
  createPalette,
} from "src/shared/shared.actions";
import { getPalettesById } from "src/shared/shared.selectors";
import styled from "styled-components";
import { mockPaletteIds } from "src/shared/mockData";
import { lookup } from "fp-ts/lib/Record";
import { pipe } from "fp-ts/lib/pipeable";
import { map, getOrElse, chain, fromNullable, fold } from "fp-ts/lib/Option";
import { GutterSize, Gutters, makeGutters } from "src/design/design.helpers";
import { Palette } from "src/shared/shared.types";
import { v5 as uuidv5 } from "uuid";
import { getCurrentUserId } from "src/auth/auth.selectors";
import { some } from "fp-ts/lib/ReadonlyRecord";
// import { RemoteDataLoader } from "src/root/root.helpers";
import { history } from "src/root/App";
import {
  makeHomeRoute,
  makeAboutRoute,
  makeEditRoute,
  makeSettingsRoute,
  composeRoutes,
  makePaletteCreatorRoute,
  makeNewRoute,
} from "src/root/root.routes";
import { Medias } from "src/root/root.styles";

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

  const loaded = (
    <Form
      onSubmit={onSubmit}
      validate={validate}
      initialValues={initialValues}
      render={({ handleSubmit, form }) => (
        <PaletteCreatorBox>
          <PaletteCreatorSidebar />
          <ContentBox>
            <PaletteCreatorPalette />
            <FooterBox>
              <Button color="secondary" gutterRight={GutterSize.Medium}>
                cancel
              </Button>
              <Button
                type="submit"
                onClick={handleSubmit}
                color="primary"
                variant="contained"
              >
                {submitLabel}
              </Button>
            </FooterBox>
          </ContentBox>
        </PaletteCreatorBox>
      )}
    ></Form>
  );

  return {
    onSubmit,
    initialValues,
    submitLabel,
    onCancel,
    loaded,
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
