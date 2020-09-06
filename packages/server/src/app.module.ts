import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';

import { HistoryModule } from './modules/history/history.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.resolve(`${__dirname}/../../client/dist`),
    }),
    HistoryModule,
  ],
})
export class AppModule {}
