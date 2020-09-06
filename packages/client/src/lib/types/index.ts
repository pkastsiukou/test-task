export type BaseAction<T> = {
  type: string;
  payload: T;
  resolve?: (value?: any) => void;
  reject?: (value?: any) => void;
};

export type ActionErrorPayload = {
  error: string;
};
