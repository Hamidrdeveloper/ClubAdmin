import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    typography: {
        fontFamily: {
          main: string;
          primary : string;
          secondary : string;
        };
    };

    colors: {
      main: string;
      main_accent?: string;
      main_accent_dark?: string;
      primary: string;
      success :string;
      secondary: string;
      grey: string;
    };
  }
}