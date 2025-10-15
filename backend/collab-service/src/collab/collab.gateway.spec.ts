import { Test, TestingModule } from '@nestjs/testing';
import { CollabGateway } from './collab.gateway';

describe('CollabGateway', () => {
  let gateway: CollabGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CollabGateway],
    }).compile();

    gateway = module.get<CollabGateway>(CollabGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
