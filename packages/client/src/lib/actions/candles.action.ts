import { Dispatch } from 'redux';
import { Candle } from '@test-task/common';

import { Api } from '../api';
import { BaseAction } from '../types';

export const CANDLES_BY_YEAR_REQUEST = 'CANDLES_BY_YEAR_REQUEST';
export const CANDLES_BY_YEAR_SUCCESS = 'CANDLES_BY_YEAR_SUCCESS';
export const CANDLES_BY_YEAR_FAILURE = 'CANDLES_BY_YEAR_FAILURE';

export type FetchCandlesPayloadResponse = {
  years: number[];
  candles: Candle[];
};

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchCandles = ({ from = 2010, to = 2020 }) => async (dispatch: Dispatch) => {
  dispatch({ type: CANDLES_BY_YEAR_REQUEST, payload: {} } as BaseAction<{}>);

  const years = new Array(to - from + 1).fill(0).map((item, index) => from + index);

  let candles: Candle[] = [];
  try {
    for (const year of years) {
      const ohlcByYear = await Api.getCandlesByYear(year);
      candles = [].concat(candles, ohlcByYear);
    }

    await sleep(1000); // just to display loader a little bit more

    dispatch({ type: CANDLES_BY_YEAR_SUCCESS, payload: { candles, years } } as BaseAction<FetchCandlesPayloadResponse>);
  } catch (error) {
    const message = error?.response?.data?.message || error.message;
    dispatch({ type: CANDLES_BY_YEAR_FAILURE, payload: { error: message } });
  }
};
