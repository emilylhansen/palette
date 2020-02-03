import React from "react";
import { connect, ConnectedProps, Provider } from "react-redux";
import { createStore, Dispatch } from "redux";
import styled from "styled-components";

type PassedProps = { iconName: string };
type InjectedProps = {};
type Props = PassedProps & InjectedProps;

export const Icon = ({ iconName }: Props) => {
  return <i className="material-icons md-12">{iconName}</i>;
};
