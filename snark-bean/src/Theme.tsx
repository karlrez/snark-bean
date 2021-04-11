import grey from "@material-ui/core/colors/grey";
import blueGrey from "@material-ui/core/colors/blueGrey";
import {
  createMuiTheme,
  responsiveFontSizes,
  Theme,
} from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/core/styles";
import { DefaultTheme } from "@material-ui/styles/defaultTheme";

export interface ThemeProviderProps<Theme = DefaultTheme> {
  children?: React.ReactNode;
  theme?: Partial<Theme> | ((outerTheme: Theme) => Theme);
}

const Themes = (props: ThemeProviderProps) => {
  const { children } = props;
  const defaultTheme = createTheme();
  return <ThemeProvider theme={defaultTheme}>{children}</ThemeProvider>;
};

export default function withTheme(Component: React.JSXElementConstructor<any>) {
  return (props: ThemeProviderProps) => {
    return (
      <Themes>
        <Component {...props} />
      </Themes>
    );
  };
}

function createTheme(): Theme {
  //light theme
  return responsiveFontSizes(
    createMuiTheme({
      palette: {
        type: "light",
        primary: {
          //darker theme colors (dark grey)
          main: grey[900],
          light: grey[800],
        },
        secondary: {
          main: blueGrey[800],
          light: blueGrey[600],
        },
        background: {
          default: grey[400],
          paper: "white",
        },
      },
      typography: {
        fontFamily: ["Comic Neue", "cursive"].join(","),
        fontSize: 14,
      },
      spacing: (factor) => `${1 * factor}rem`,
    })
  );
}
