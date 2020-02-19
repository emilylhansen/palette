import React, { useState } from "react";
import { connect, ConnectedProps, Provider } from "react-redux";
import { createStore, Dispatch } from "redux";
import styled, { keyframes } from "styled-components";
import { PaletteOverviewCard } from "src/shared/PaletteOverviewCard";
import { PaletteTileCard } from "src/shared/PaletteTileCard";
import { range } from "fp-ts/lib/Array";
import { mockPalettes } from "src/shared/mockData";
import { Overlay } from "src/design/Overlay";
import { Icon } from "src/design/Icon";
import { Option, none, some, isSome, map } from "fp-ts/lib/Option";
import { Palette } from "src/root/root.types";
import { T12, T24 } from "src/design/Text";
import Button from "@material-ui/core/Button";
import { Modal } from "src/design/Modal";

const LoginBox = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

type PassedProps = {};
type InjectedProps = {};
type Props = PassedProps & InjectedProps;

export const Login = ({}: Props) => {
  return (
    <Modal isOpen={true}>
      <LoginBox>
        <T24>Welcome back.</T24>
        <T12>
          Sign in to get personalized story recommendations, follow authors and
          topics you love, and interact with stories.
        </T12>
        <Button variant="outlined" startIcon={<Icon iconName="mail_outline" />}>
          Sign in with email
        </Button>
        <T12>
          No account? <a href="">Create one</a>.
        </T12>
      </LoginBox>
    </Modal>
  );
};
