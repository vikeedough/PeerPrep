import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CollabGateway } from './collab/collab.gateway';
import { CollabModule } from './collab/collab.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CollabModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
