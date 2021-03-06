import { createMuiTheme, Theme as MuiTheme } from "@material-ui/core/styles";
import baseStyled, { ThemedStyledInterface } from "styled-components";

export type MainTheme = {
  tertiary: {
    main: string;
    dark?: string;
    light?: string;
  };
  quaternary: {
    main: string;
    dark?: string;
    light?: string;
  };
};

export const mainTheme: MainTheme = {
  tertiary: {
    main: "#ED4D50",
    dark: "#a53538",
    light: "#f07073",
  },
  quaternary: {
    main: "#D3E3FC",
    dark: "#939eb0",
    light: "#dbe8fc",
  },
};

export const muiTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#77a6f7",
      dark: "#5374ac",
      light: "#92b7f8",
      contrastText: "#fff",
    },
    secondary: {
      main: "#008874",
      dark: "#005f51",
      light: "#339f8f",
      contrastText: "#fff",
    },
    info: {
      main: "#f13c20",
      dark: "#a82a16",
      light: "#f3634c",
    },
  },
  typography: {
    fontFamily: '"Montserrat" ,sans-serif',
  },
});

const defaultMuiTheme: MuiTheme = createMuiTheme();

export type Theme = {
  main: MainTheme;
  mui: MuiTheme;
  defaultMui: MuiTheme;
};

export const theme: Theme = {
  main: mainTheme,
  mui: muiTheme,
  defaultMui: defaultMuiTheme,
};

export const styled = baseStyled as ThemedStyledInterface<Theme>;
