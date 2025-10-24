import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { BearerAuthGuard } from '../auth/bearer-auth.guard';

@Controller('questions')
@UseGuards(BearerAuthGuard)
export class QuestionsController {
  constructor(private readonly svc: QuestionsService) {}
  @Get()
  async list(@Query('limit') limit?: string) {
    const n = Number(limit) || 5;
    return this.svc.findTop(n);
  }
}