import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import { CandleHistoryForm } from './CandleHistoryForm';
import { CandleHistoryResult } from './CandleHistoryResult';

export const CandleHistory = () => {
  return (
    <Container maxWidth="sm">
      <Grid container direction="column">
        <Grid item>
          <CandleHistoryForm />
        </Grid>
        <Grid item>
          <CandleHistoryResult />
        </Grid>
      </Grid>
    </Container>
  );
};
