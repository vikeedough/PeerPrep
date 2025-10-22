import { Test, TestingModule } from '@nestjs/testing';
import { MatchingGateway } from './matching.gateway';

describe('MatchingGateway', () => {
  let gateway: MatchingGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MatchingGateway],
    }).compile();

    gateway = module.get<MatchingGateway>(MatchingGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
