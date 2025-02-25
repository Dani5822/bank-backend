import { Test, TestingModule } from '@nestjs/testing';
import { RepeatableTransactionController } from './repeatable-transaction.controller';
import { RepeatableTransactionService } from './repeatable-transaction.service';

describe('RepeatableTransactionController', () => {
  let controller: RepeatableTransactionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RepeatableTransactionController],
      providers: [RepeatableTransactionService],
    }).compile();

    controller = module.get<RepeatableTransactionController>(RepeatableTransactionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
