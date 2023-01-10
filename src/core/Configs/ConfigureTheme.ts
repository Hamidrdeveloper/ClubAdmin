import { DefaultTheme } from 'styled-components';

const adminTheme: DefaultTheme = {
  typography: {
    fontFamily: {
      main: 'Roboto',
      primary: 'Avenir',
      secondary: 'Proxima',
    },
  },

  colors: {
    main: '#145887',
    main_accent: '#285F84',
    main_accent_dark: '#1F5274',
    primary: '#C9E9FF',
    secondary: '#F7617D',
    success: '#38B153',
    grey: '#d9d9d9',
  },
};

const shopTheme: DefaultTheme = {
  typography: {
    fontFamily: {
      main: 'Roboto',
      primary: 'Avenir',
      secondary: 'Proxima',
    },
  },

  colors: {
    main: '#E00084',
    primary: '#C9E9FF',
    secondary: '#4F4F4F',
    success: '#38B153',
    grey: '#d9d9d9',
    main_accent: 'None',
    main_accent_dark: 'None',
  },
};

export { adminTheme, shopTheme };
