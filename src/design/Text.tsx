import React, { ReactNode } from "react";
import styled, { css, FlattenSimpleInterpolation } from "styled-components";
import { isNil } from "src/shared/shared.typeGuards";
import Typography, { TypographyProps } from "@material-ui/core/Typography";

type GutterSize = "small" | "medium" | "large";

const gutterSizes: Record<GutterSize, number> = {
  small: 4,
  medium: 8,
  large: 16,
};

type StyledTypographyProps = Omit<TextProps, "children" | "gutterBottom"> & {
  gutterBottom_: TextProps["gutterBottom"];
};

const StyledTypography = styled(Typography)<StyledTypographyProps>`
  ${({
    fontWeight,
    cssOverrides,
    gutterTop,
    gutterBottom_,
    gutterRight,
    gutterLeft,
  }) => css`
    font-weight: ${isNil(fontWeight) ? 400 : fontWeight};
    margin: ${`${isNil(gutterTop) ? 0 : gutterSizes[gutterTop]}px ${
      isNil(gutterRight) ? 0 : gutterSizes[gutterRight]
    }px ${isNil(gutterBottom_) ? 0 : gutterSizes[gutterBottom_]}px ${
      isNil(gutterLeft) ? 0 : gutterSizes[gutterLeft]
    }px `};

    ${cssOverrides}
  `}
`;

type TextProps = {
  children: ReactNode;
  fontWeight?: number;
  cssOverrides?: FlattenSimpleInterpolation;
  gutterTop?: GutterSize;
  gutterRight?: GutterSize;
  gutterBottom?: GutterSize;
  gutterLeft?: GutterSize;
} & Omit<TypographyProps, "gutterBottom">;

export const Text = ({
  children,
  fontWeight,
  cssOverrides,
  gutterTop,
  gutterBottom,
  gutterRight,
  gutterLeft,
  ...typographyProps
}: TextProps) => (
  <StyledTypography
    fontWeight={fontWeight}
    cssOverrides={cssOverrides}
    gutterTop={gutterTop}
    gutterRight={gutterRight}
    gutterBottom_={gutterBottom}
    gutterLeft={gutterLeft}
    {...typographyProps}
  >
    {children}
  </StyledTypography>
);
