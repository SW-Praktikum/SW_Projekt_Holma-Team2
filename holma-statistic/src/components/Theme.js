import { colors } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';

/**
 * Es sind die verschiedenen Styling-Elemente der Holma Statistik enthalten.
 */

const white = '#FFFFFF';
const black = '#000000';

const theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
      //tablet: 640,
      //laptop: 1024,
      //desktop: 1280,
    },
  },
    palette: {
      black,
      white,
      primary: {
        contrastText: white,
        dark: colors.teal[900],
        main: colors.teal[600],
        light: colors.teal[100]
      },
      secondary: {
        contrastText: white,
        dark: colors.blue[900],
        main: colors.blue['A400'],
        light: colors.blue['A400']
      },
      delete:{
        main: '#fa340c'
      },
      success: {
        contrastText: white,
        dark: colors.green[900],
        main: colors.green[600],
        light: colors.green[400]
      },
      info: {
        contrastText: white,
        dark: colors.blue[900],
        main: colors.blue[600],
        light: colors.blue[400]
      },
      warning: {
        contrastText: white,
        dark: colors.orange[900],
        main: colors.orange[600],
        light: colors.orange[400]
      },
      error: {
        contrastText: white,
        dark: colors.red[900],
        main: colors.red[600],
        light: colors.red[400]
      },
      text: {
        primary: colors.blueGrey[800],
        secondary: colors.blueGrey[600],
        link: colors.blue[600]
      },
      background: {
        default: '#F4F6F8',
        paper: white
      },
      icon: colors.blueGrey[600],
      divider: colors.grey[200]
    }, 
  });

  export default theme;