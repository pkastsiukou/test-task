import { Injectable, Logger } from '@nestjs/common';
import * as _ from 'lodash';
import { CandleDto } from './dto/CandleDto';
import { Candle } from '@test-task/common';

type StoredCandle = {
  date: Date;
} & Candle;

const precision = 8;

@Injectable()
export class HistoryService {
  private candles: StoredCandle[] = [];

  constructor() {
    // generate candles and save them into memory
    this.seedData();
  }

  private seedData() {
    Logger.log('Seeding candle data started...', 'HistoryService:seedData');
    const date = new Date('2010-01-01');
    let prevPrice;

    do {
      const candle = this.generateCandle(prevPrice);
      this.candles.push({ ...candle, date: new Date(date) });
      prevPrice = candle.c;
      const month = date.getUTCMonth();
      if (month < 11) {
        date.setUTCMonth(month + 1);
      } else {
        const year = date.getUTCFullYear();
        date.setUTCMonth(0);
        date.setUTCFullYear(year + 1);
      }
    } while (date < new Date());
    Logger.log('Seeding candle data completed', 'HistoryService:seedData');
  }

  private generateCandle(prevPrice?: number): CandleDto {
    const candle = new CandleDto();
    const openPrice = prevPrice || _.random(1.0, 1.5);
    candle.o = _.round(openPrice, precision);
    candle.h = _.round(openPrice * _.random(1.01, 1.2), precision);
    candle.l = _.round(openPrice * _.random(0.8, 0.99), precision);
    candle.c = _.round(_.random(candle.l, candle.h), precision);
    return candle;
  }

  public async getCandlesByYear(year: number): Promise<CandleDto[]> {
    const currentDate = new Date();
    if (year < 2010 || year > currentDate.getUTCFullYear()) {
      throw new Error('INCORRECT_YEAR');
    }

    const storedData = _.filter(
      this.candles,
      (storedCandle: StoredCandle) => storedCandle.date.getUTCFullYear() === year,
    );
    return _.map(storedData, (storedCandle: StoredCandle) => _.pick(storedCandle, ['o', 'h', 'l', 'c']));
  }
}
