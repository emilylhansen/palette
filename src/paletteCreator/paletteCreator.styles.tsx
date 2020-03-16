import React, { ReactNode } from "react";
import { Text } from "src/design/Text";
import { GutterSize, Gutters, makeGutters } from "src/design/design.helpers";
import { styled } from "src/root/root.theme";

export const SectionHeader = ({ children }: { children: ReactNode }) => (
  <Text variant="subtitle2" gutterBottom={GutterSize.Medium} fontWeight={600}>
    {children}
  </Text>
);

export const SubSectionBox = styled.div``;

export const SectionBox = styled.div`
  > ${SubSectionBox}:not(:last-child) {
    margin-bottom: 16px;
  }
`;
