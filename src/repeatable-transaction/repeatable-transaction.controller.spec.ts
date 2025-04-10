import { Test, TestingModule } from '@nestjs/testing';
import { RepeatableTransactionController } from './repeatable-transaction.controller';
import { RepeatableTransactionService } from './repeatable-transaction.service';
import { PrismaService } from 'src/prisma.service';
import { ExpenseService } from 'src/expense/expense.service';
import { JwtService } from '@nestjs/jwt';

describe('RepeatableTransactionController', () => {
  let controller: RepeatableTransactionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RepeatableTransactionController],
      providers: [RepeatableTransactionService,PrismaService,ExpenseService,JwtService],
    }).compile();

    controller = module.get<RepeatableTransactionController>(RepeatableTransactionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
