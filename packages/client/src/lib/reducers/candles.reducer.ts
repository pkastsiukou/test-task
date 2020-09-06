import { Candle } from '@test-task/common';
import { ActionErrorPayload, BaseAction } from '../types';
import {
  CANDLES_BY_YEAR_FAILURE,
  CANDLES_BY_YEAR_REQUEST,
  CANDLES_BY_YEAR_SUCCESS,
  FetchCandlesPayloadResponse,
} from '../actions';

export type CandlesReducerState = {
  years: number[];
  candles: Candle[];
  error: null | string;
  loading: boolean;
};

const initialState: CandlesReducerState = {
  years: [],
  candles: [],
  error: null,
  loading: false,
};

type ActionPayload = FetchCandlesPayloadResponse | ActionErrorPayload;

export const candlesReducer = (state = initialState, action: BaseAction<ActionPayload>): CandlesReducerState => {
  switch (action.type) {
    case CANDLES_BY_YEAR_REQUEST: {
      return { ...state, candles: [], years: [], error: null, loading: true };
    }
    case CANDLES_BY_YEAR_SUCCESS: {
      const { candles, years } = action.payload as FetchCandlesPayloadResponse;
      return { ...state, candles, years, error: null, loading: false };
    }
    case CANDLES_BY_YEAR_FAILURE: {
      const { error } = action.payload as ActionErrorPayload;
      return { ...state, candles: [], years: [], error, loading: false };
    }
    default: {
      return state;
    }
  }
};
