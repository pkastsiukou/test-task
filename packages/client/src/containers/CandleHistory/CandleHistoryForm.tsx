import * as React from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { Button, MenuItem } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';

import { fetchCandles } from '../../lib/actions';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

type Values = {
  from?: number;
  to?: number;
};

type ErrorMessages = {
  from: string;
  to: string;
};

const yearOptions = [
  { value: undefined, label: ' - ' },
  { value: 2010, label: '2010' },
  { value: 2011, label: '2011' },
  { value: 2012, label: '2012' },
  { value: 2013, label: '2013' },
  { value: 2014, label: '2014' },
  { value: 2015, label: '2015' },
  { value: 2016, label: '2016' },
  { value: 2017, label: '2017' },
  { value: 2018, label: '2018' },
  { value: 2019, label: '2019' },
  { value: 2020, label: '2020' },
];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2),
    },
  })
);

export const CandleHistoryForm = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <Paper className={classes.paper} square>
      <Formik
        initialValues={{
          from: undefined,
          to: undefined,
        }}
        validate={(values: Values) => {
          const errors: Partial<ErrorMessages> = {};
          if (!values.from && !values.to) {
            errors.from = 'At least one should be selected';
            errors.to = 'At least one should be selected';
          }
          if (values.from && values.to && values.from > values.to) {
            errors.from = 'Should be less or equal to "Year to"';
          }
          return errors;
        }}
        onSubmit={(values: Values, { setSubmitting }) => {
          setSubmitting(true);
          const { from, to } = values;
          fetchCandles({ from, to })(dispatch).finally(() => {
            setSubmitting(false);
          });
        }}
        render={({ submitForm, isSubmitting, isValid, dirty, values, touched, errors }) => (
          <Container maxWidth="sm">
            <Form>
              <Box margin={1}>
                <Field
                  component={TextField}
                  type="text"
                  name="from"
                  label="Year from"
                  select
                  variant="standard"
                  helperText={(touched.from && errors.from) || ' '}
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                  value={values.from}
                  error={touched.from && errors.from}
                >
                  {yearOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Field>
              </Box>
              <Box margin={1}>
                <Field
                  component={TextField}
                  type="text"
                  name="to"
                  label="Year To"
                  select
                  variant="standard"
                  helperText={(touched.to && errors.to) || ' '}
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                  value={values.to}
                  error={touched.to && errors.to}
                >
                  {yearOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Field>
              </Box>
              <Box margin={1}>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting || !isValid || !dirty}
                  onClick={submitForm}
                >
                  Submit
                </Button>
              </Box>
            </Form>
          </Container>
        )}
      />
    </Paper>
  );
};
