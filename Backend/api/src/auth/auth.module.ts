import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { BearerAuthGuard } from './bearer-auth.guard';
import { JwtService } from './jwt.service';

@Module({
  controllers: [AuthController],
  providers: [BearerAuthGuard, JwtService],
  exports: [BearerAuthGuard, JwtService],
})
export class AuthModule {}