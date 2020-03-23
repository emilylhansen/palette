import CircularProgress from "@material-ui/core/CircularProgress";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { authenticate } from "src/auth/auth.actions";
import { mockCurrentUser, COUNT } from "src/shared/mockData";
import {
  getFavoriteColorIds as getFavoriteColorIdsAction,
  getFavoritePaletteIds as getFavoritePaletteIdsAction,
  getPalettes,
  getUsers,
  getRandomObject,
} from "src/shared/shared.actions";
import { Homepage } from "src/homepage/Homepage";
import { range } from "fp-ts/lib/Array";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      margin: "auto",
    },
  })
);

type Props = {};

const useHomepageLoader = (props: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = useDispatch();

  const classes = useStyles();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      dispatch(authenticate({ user: mockCurrentUser }));
      /** fetch users to show authors for each palette */
      dispatch(getUsers());
      dispatch(getPalettes());
      /** fetch favorite color and palette ids to display favorited content */
      dispatch(getFavoriteColorIdsAction());
      dispatch(getFavoritePaletteIdsAction());

      const getRandomObjectPromises = range(0, COUNT).map(i =>
        dispatch(getRandomObject())
      );
      await Promise.all(getRandomObjectPromises);

      setIsLoading(false);
    };

    fetchData();
  }, [dispatch, setIsLoading]);

  return { isLoading, classes };
};

export const HomepageLoader = (props: Props) => {
  const state = useHomepageLoader(props);

  return state.isLoading ? (
    <CircularProgress
      color="secondary"
      classes={{ root: state.classes.root }}
    />
  ) : (
    <Homepage />
  );
};
