import { Controller, Get, Query, ParseIntPipe } from '@nestjs/common';
import { OhlcReponse } from '@test-task/common';

import { HistoryService } from './history.service';

@Controller('history')
export class HistoryController {
  constructor(private historyService: HistoryService) {}

  @Get('candles_by_year')
  public async getCandlesByYear(@Query('year', ParseIntPipe) year: number): Promise<OhlcReponse> {
    const ohlc = await this.historyService.getCandlesByYear(year);
    return { status: 200, ohlc };
  }
}
