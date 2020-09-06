import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';
import { lightBlue } from '@material-ui/core/colors';

export const AppThemeProps: ThemeOptions = {
  palette: {
    primary: {
      main: lightBlue[600],
      contrastText: '#FFFFFF',
    },
  },
  overrides: {
    MuiFormLabel: {
      root: {
        whiteSpace: 'nowrap',
      },
    },
    MuiOutlinedInput: {
      root: {
        borderRadius: 0,
      },
    },
    MuiButton: {
      root: {
        borderRadius: 0,
      },
    },
    MuiAlert: {
      root: {
        borderRadius: 0,
      },
    },
  },
};
