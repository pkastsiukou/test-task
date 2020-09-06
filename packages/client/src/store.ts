import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import { CandlesReducerState, candlesReducer } from './lib/reducers';

export const store = createStore(
  combineReducers({
    candlesState: candlesReducer,
  }),
  composeWithDevTools(applyMiddleware(thunk))
);

export type StoreState = {
  candlesState: CandlesReducerState;
};
