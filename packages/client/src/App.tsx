import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/core/styles';

import { store } from './store';
import { AppTheme } from './lib/themes';
import { CandleHistory } from './containers/CandleHistory';

export const App = () => (
  <Provider store={store}>
    <ThemeProvider theme={AppTheme}>
      <CandleHistory />
    </ThemeProvider>
  </Provider>
);
