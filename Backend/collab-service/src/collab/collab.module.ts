import { Module } from '@nestjs/common';
import { CollabGateway } from './collab.gateway';

@Module({
  providers: [CollabGateway],
})
export class CollabModule {}
