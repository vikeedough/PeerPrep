import { Module } from '@nestjs/common';
import { MatchingGateway } from './matching/matching.gateway';

@Module({
  providers: [MatchingGateway],
})
export class AppModule {}
