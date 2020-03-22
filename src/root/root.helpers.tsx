import { PackAction } from "src/root/root.types";
import { styled } from "src/root/root.theme";
import Loader from "react-loaders";
import { RemoteData, fold, RemoteSuccess } from "@devexperts/remote-data-ts";
import React, { ReactNode } from "react";
import { css } from "styled-components";

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
  // promise: Promise.resolve(new Promise(() => payload)),
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
