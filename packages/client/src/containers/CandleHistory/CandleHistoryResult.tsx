import React from 'react';
import { useSelector } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import MuiAlert from '@material-ui/lab/Alert';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import {
  selectCandleError,
  selectCandleExtValues,
  selectCandleIsLoading,
  selectCandleProcessedYears,
} from '../../lib/selectors';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
    paper: {
      padding: theme.spacing(2),
    },
    error: {
      margin: '10px 0',
    },
    item: {
      flex: 1,
      textAlign: 'center',
    },
  })
);

export const CandleHistoryResult = () => {
  const classes = useStyles();
  const extValues = useSelector(selectCandleExtValues);
  const processedYears = useSelector(selectCandleProcessedYears);
  const error = useSelector(selectCandleError);
  const isLoading = useSelector(selectCandleIsLoading);

  if (isLoading) {
    return (
      <Backdrop className={classes.backdrop} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  if (error) {
    return (
      <Paper className={classes.paper} square>
        <MuiAlert className={classes.error} elevation={6} variant="filled" severity="error">
          {error}
        </MuiAlert>
      </Paper>
    );
  }

  if (extValues) {
    return (
      <Paper className={classes.paper} square>
        <Grid container direction="column">
          <Grid item>
            <Typography variant="h5" gutterBottom align="center">
              Result for years: {processedYears.join(', ')}
            </Typography>
          </Grid>
          <Grid item>
            <Grid container direction="row">
              <Grid item className={classes.item}>
                <Grid container direction="column">
                  <Grid item>
                    <Typography variant="h6">Lowest value</Typography>
                  </Grid>
                  <Grid item>{extValues.low}</Grid>
                </Grid>
              </Grid>
              <Grid item className={classes.item}>
                <Grid container direction="column">
                  <Grid item>
                    <Typography variant="h6">Highest value</Typography>
                  </Grid>
                  <Grid item>{extValues.high}</Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    );
  }

  return null;
};
