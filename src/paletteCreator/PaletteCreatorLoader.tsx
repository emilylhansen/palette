import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getColors, getFavoriteColorIds } from "src/shared/shared.actions";
import styled from "styled-components";
import { PaletteCreator } from "src/paletteCreator/PaletteCreator";
import { useParams } from "react-router";
import CircularProgress from "@material-ui/core/CircularProgress";
import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      margin: "auto",
    },
  })
);

const PaletteCreatorLoaderBox = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  height: 100%;
`;

type Props = {};

const usePaletteCreatorLoader = (props: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = useDispatch();

  const { id } = useParams();

  const classes = useStyles();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      dispatch(getColors());
      dispatch(getFavoriteColorIds());

      setIsLoading(false);
    };

    fetchData();
  }, [dispatch, setIsLoading]);

  return { isLoading, id, classes };
};

export const PaletteCreatorLoader = (props: Props) => {
  const state = usePaletteCreatorLoader(props);

  return state.isLoading ? (
    <CircularProgress
      color="secondary"
      classes={{ root: state.classes.root }}
    />
  ) : (
    <PaletteCreatorLoaderBox>
      <PaletteCreator paletteId={state.id} />
    </PaletteCreatorLoaderBox>
  );
};
