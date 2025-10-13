import { Test, TestingModule } from '@nestjs/testing';
import { MatchingService } from './matching.service';

describe('MatchingService', () => {
  let gateway: MatchingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MatchingService],
    }).compile();

    gateway = module.get<MatchingService>(MatchingService);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
