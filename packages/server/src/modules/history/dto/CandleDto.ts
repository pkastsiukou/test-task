import { IsNumber } from 'class-validator';
import { Candle } from "@test-task/common";

export class CandleDto implements Candle {
  @IsNumber()
  o: number;

  @IsNumber()
  h: number;

  @IsNumber()
  l: number;

  @IsNumber()
  c: number;
}
