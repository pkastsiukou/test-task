import { createSelector } from 'reselect';
import { Candle } from '@test-task/common';

import { CandlesReducerState } from '../reducers';
import { StoreState } from '../../store';

export const selectCandlesReducer = (state: StoreState): CandlesReducerState => state.candlesState;

export const selectCandleError = createSelector(selectCandlesReducer, (candlesReducer) => candlesReducer.error);
export const selectCandleIsLoading = createSelector(selectCandlesReducer, (candlesReducer) => candlesReducer.loading);
export const selectCandleData = createSelector(selectCandlesReducer, (candlesReducer) => candlesReducer.candles);
export const selectCandleProcessedYears = createSelector(
  selectCandlesReducer,
  (candlesReducer) => candlesReducer.years
);
export const selectCandleExtValues = createSelector(selectCandleData, (candles: Candle[]) => {
  if (candles.length === 0) {
    return null;
  }
  const low =
    Math.min.apply(
      null,
      candles.map((item) => item.l)
    ) || 0;
  const high =
    Math.max.apply(
      null,
      candles.map((item) => item.h)
    ) || 0;

  return { low, high };
});
