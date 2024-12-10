import React, { createContext, ReactNode } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Theme {
    background: {
      defaultcolor: string;
      primarycolor: string;
      secondary: string;
    };
    borderstyle: {
      border: string;
    };
    active: {
      activecolor: string;
      Diactive: string;
    };
    textcolor: {
      text: string;
      tabletext: string;
    };
  }

  interface ThemeOptions {
    background?: {
      defaultcolor?: string;
      primarycolor?: string;
      secondary?: string;
    };
    borderstyle?: {
      border?: string;
    };
    active?: {
      activecolor?: string;
      Diactive?: string;
    };
    textcolor?: {
      text?: string;
      tabletext?: string;
    };
  }
}

const theme = createTheme({
  // palette: {
  //   background: {
  //     default: "#000000",
  //     paper: "#222222",
  //   },
  //   primary: {
  //     main: "#222222",
  //   },
  //   secondary: {
  //     main: "#F7F7F7",
  //   },
  //   success: {
  //     main: "#79F2C0",
  //   },
  //   error: {
  //     main: "#FFBDAD",
  //   },
  //   text: {
  //     primary: "#42526E",
  //     secondary: "#717171",
  //   }
  // },
  background: {
    defaultcolor: "#000000",
    primarycolor: "#222222",
    secondary: "#F7F7F7",
  },
  borderstyle: {
    border: "1px solid #BDBDBD",
  },
  active: {
    activecolor: "#79F2C0",
    Diactive: "#FFBDAD",
  },
  textcolor: {
    text: "#42526E",
    tabletext: "#717171",
  },
  typography: {
    h1: {
      fontSize: "5rem",
      fontFamily: "Raleway",
    },
    h2: {
      fontSize: "3.5rem",
      fontFamily: "Open Sans",
      fontStyle: "bold",
    },
    h3: {
      fontSize: "2.5rem",
      fontFamily: "Roboto",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          border: "1px solid #BDBDBD",
        },
      },
    },
  },
});

type ThemeContextType = {};

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

export const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeContext.Provider value={{}}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};