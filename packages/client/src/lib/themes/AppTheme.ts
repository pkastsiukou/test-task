import { createMuiTheme } from '@material-ui/core/styles';
import { AlertProps } from '@material-ui/lab/Alert';

import { AppThemeProps } from './AppThemeProps';

declare module '@material-ui/core/styles/overrides' {
  export interface ComponentNameToClassKey {
    MuiAlert: AlertProps;
  }
}

export default createMuiTheme(AppThemeProps);
