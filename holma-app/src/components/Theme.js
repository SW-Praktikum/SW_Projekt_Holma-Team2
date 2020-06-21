/* import { createMuiTheme } from '@material-ui/core/styles';
import { colors } from '@material-ui/core';

const white = '#FFFFFF';
const black = '#000000';

const theme = createMuiTheme({
    palette: {
      black,
      white,
      primary: {
        contrastText: white,
        dark: colors.indigo[900],
        main: colors.indigo[500],
        light: colors.indigo[100]
      },
      secondary: {
        contrastText: white,
        dark: colors.blue[900],
        main: colors.blue['A400'],
        light: colors.blue['A400']
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

  */

 import { deepmerge } from '@material-ui/utils';
 import createBreakpoints from './createBreakpoints';
 import createMixins from './createMixins';
 import createPalette from './createPalette';
 import createTypography from './createTypography';
 import shadows from './shadows';
 import shape from './shape';
 import createSpacing from './createSpacing';
 import transitions from './transitions';
 import zIndex from './zIndex';
 
 function createMuiTheme(options = {}, ...args) {
   const {
     breakpoints: breakpointsInput = {},
     mixins: mixinsInput = {},
     palette: paletteInput = {},
     spacing: spacingInput,
     typography: typographyInput = {},
     ...other
   } = options;
 
   const palette = createPalette(paletteInput);
   const breakpoints = createBreakpoints(breakpointsInput);
   const spacing = createSpacing(spacingInput);
 
   let muiTheme = deepmerge(
     {
       breakpoints,
       direction: 'ltr',
       mixins: createMixins(breakpoints, spacing, mixinsInput),
       overrides: {}, // Inject custom styles
       palette,
       props: {}, // Provide default props
       shadows,
       typography: createTypography(palette, typographyInput),
       spacing,
       shape,
       transitions,
       zIndex,
     },
     other,
   );
 
   muiTheme = args.reduce((acc, argument) => deepmerge(acc, argument), muiTheme);
 
   if (process.env.NODE_ENV !== 'production') {
     const pseudoClasses = [
       'checked',
       'disabled',
       'error',
       'focused',
       'focusVisible',
       'required',
       'expanded',
       'selected',
     ];
     const traverse = (node, parentKey, depth = 1) => {
       let key;
 
       // eslint-disable-next-line guard-for-in, no-restricted-syntax
       for (key in node) {
         const child = node[key];
         if (depth === 1) {
           if (key.indexOf('Mui') === 0 && child) {
             traverse(child, key, depth + 1);
           }
         } else if (pseudoClasses.indexOf(key) !== -1 && Object.keys(child).length > 0) {
           if (process.env.NODE_ENV !== 'production') {
             console.error(
               [
                 `Material-UI: The \`${parentKey}\` component increases ` +
                   `the CSS specificity of the \`${key}\` internal state.`,
                 'You can not override it like this: ',
                 JSON.stringify(node, null, 2),
                 '',
                 'Instead, you need to use the $ruleName syntax:',
                 JSON.stringify(
                   {
                     root: {
                       [`&$${key}`]: child,
                     },
                   },
                   null,
                   2,
                 ),
                 '',
                 'https://material-ui.com/r/pseudo-classes-guide',
               ].join('\n'),
             );
           }
           // Remove the style to prevent global conflicts.
           node[key] = {};
         }
       }
     };
 
     traverse(muiTheme.overrides);
   }
 
   return muiTheme;
 }
 
 export default createMuiTheme;