import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CollabGateway } from './collab/collab.gateway';
import { CollabModule } from './collab/collab.module';

@Module({
  imports: [CollabModule],
  controllers: [AppController],
  providers: [AppService, CollabGateway],
})
export class AppModule {}
