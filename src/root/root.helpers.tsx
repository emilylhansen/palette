import { PackAction } from "src/root/root.types";
import { styled } from "src/root/root.theme";
import Loader from "react-loaders";
import { RemoteData, fold, RemoteSuccess } from "@devexperts/remote-data-ts";
import React, { ReactNode } from "react";
import { css } from "styled-components";

/**
 * redux-pack needs a 'promise' key or else it throws and error.
 * However the 'payload' key is only present when we get the promise back.
 * Since I'm using a lot of mock data, resolve the promise so it doesn't
 * get stuck at the 'start' phase of the handler. Now we only have to handle
 * the 'success' phase.
 */
export const makePackAction = <T, P, M>({
  type,
  payload,
  meta,
}: {
  type: T;
  payload: P;
  meta?: M;
}): PackAction<T, P, M> => ({
  type,
  promise: Promise.resolve(payload),
  payload,
  meta,
});

const RemoteDataLoaderBox = styled.div`
  width: 100%;
  height: 100%;

  ${({ theme }) => css`
    color: ${theme.mui.palette.primary.main};
  `}
`;

export const RemoteDataLoader = <E, A>({
  data,
  onLoaded,
}: {
  data: RemoteData<E, A>;
  onLoaded: (data: A) => ReactNode;
}) => (
  <RemoteDataLoaderBox>
    {fold<E, A, ReactNode>(
      () => <Loader type="ball-pulse-sync" active />,
      () => <Loader type="ball-pulse-sync" active />,
      err => <div>{err}</div>,
      data_ => onLoaded(data_)
    )(data)}
  </RemoteDataLoaderBox>
);
