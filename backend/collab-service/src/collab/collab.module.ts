import { Module } from '@nestjs/common';
import { CollabGateway } from './collab.gateway';
import { AuthService } from 'src/auth/auth.service';
import { CollabService } from './collab.service';

@Module({
  providers: [CollabGateway, CollabService, AuthService],
  exports: [CollabService],
})
export class CollabModule {}
