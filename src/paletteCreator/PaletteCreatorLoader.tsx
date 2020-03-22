import React, { useEffect, ReactNode } from "react";
import { useDispatch } from "react-redux";
import {
  getColors,
  getFavoriteColorIds,
  getPalettes,
  getUsers,
} from "src/shared/shared.actions";
import styled from "styled-components";
import { PaletteCreator } from "src/paletteCreator/PaletteCreator";
import { useParams } from "react-router";

const PaletteCreatorLoaderBox = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  height: 100%;
`;

type Props = {};

const usePaletteCreatorLoader = (props: Props) => {
  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    dispatch(getPalettes());
    dispatch(getColors());
    dispatch(getUsers());
    dispatch(getFavoriteColorIds());
    // dispatch(authenticate({ key: "" }));
  }, [dispatch]);

  return { id };
};

export const PaletteCreatorLoader = (props: Props) => {
  const state = usePaletteCreatorLoader(props);

  return (
    <PaletteCreatorLoaderBox>
      <PaletteCreator paletteId={state.id} />
    </PaletteCreatorLoaderBox>
  );
};
