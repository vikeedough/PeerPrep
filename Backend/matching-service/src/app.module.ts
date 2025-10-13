import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MatchingGateway } from './matching/matching.gateway';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, MatchingGateway],
})
export class AppModule {}
