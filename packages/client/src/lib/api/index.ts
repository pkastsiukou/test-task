import axios from 'axios';
import { Candle, OhlcReponse } from '@test-task/common';

export const API_PREFIX = 'http://localhost:4000/api/v1'; // should be moved to .env

export const Api = {
  async getCandlesByYear(year: number): Promise<Candle[]> {
    const response = await axios.get(`${API_PREFIX}/history/candles_by_year?year=${year}`);
    const responseData = response.data as OhlcReponse;
    return responseData.ohlc;
  },
};
