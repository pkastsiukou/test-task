export type BaseResponse = {
  status: number;
};

export type ErrorResponse = {
  message: string;
} & BaseResponse;

export type Candle = {
  o: number;
  h: number;
  l: number;
  c: number;
};

export type OhlcReponse = { ohlc: Candle[] } & BaseResponse;
