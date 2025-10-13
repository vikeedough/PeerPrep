import { Module } from '@nestjs/common';
import { CollabGateway } from './collab.gateway';
import { AuthService } from 'src/auth/auth.service';

@Module({
  providers: [CollabGateway, AuthService],
})
export class CollabModule {}
