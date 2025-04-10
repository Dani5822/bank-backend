import { Test, TestingModule } from '@nestjs/testing';
import { RepeatableTransactionService } from './repeatable-transaction.service';
import { PrismaService } from 'src/prisma.service';
import { ExpenseService } from 'src/expense/expense.service';
import { NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { RepeatableTransaction } from '@prisma/client';

describe('RepeatableTransactionService', () => {
  let service: RepeatableTransactionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RepeatableTransactionService,PrismaService,ExpenseService],
    }).compile();
    service = module.get<RepeatableTransactionService>(RepeatableTransactionService);
    });

    it('should be defined', () => {
    expect(service).toBeDefined();
    });

    describe('RepeatableTransactionService', () => {
      let service: RepeatableTransactionService;
      let prismaService: PrismaService;
      let expenseService: ExpenseService;

      beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
          providers: [
            RepeatableTransactionService,
            {
              provide: PrismaService,
              useValue: {
                repeatableTransaction: {
                  findUnique: jest.fn(),
                  update: jest.fn(),
                },
              },
            },
            {
              provide: ExpenseService,
              useValue: {
                create: jest.fn(),
              },
            },
          ],
        }).compile();

        service = module.get<RepeatableTransactionService>(RepeatableTransactionService);
        prismaService = module.get<PrismaService>(PrismaService);
        expenseService = module.get<ExpenseService>(ExpenseService);
      });

      it('should be defined', () => {
        expect(service).toBeDefined();
      });

      describe('updateTransaction', () => {
        it('should throw NotFoundException if transaction is not found', async () => {
          jest.spyOn(prismaService.repeatableTransaction, 'findUnique').mockResolvedValue(null);

          await expect(service.updateTransaction('tranId', 'userId')).resolves.toThrow(NotFoundException);
        });

        it('should throw HttpException if transaction is not active', async () => {
          const transaction: RepeatableTransaction = {
            id: 'tranId',
            total: 100,
            category: 'Other',
            name: 'Other',
            description: 'description',
            accountId: 'accountId',
            repeatStart: new Date('2022-01-01'),
            repeatEnd: new Date('2022-12-31'),
            lastChange: new Date('2022-01-01'),
            repeatMetric: 'Week',
            repeatAmount: 1,
            createdAt: new Date(),
          };
          jest.spyOn(prismaService.repeatableTransaction, 'findUnique').mockResolvedValue(transaction);

          await expect(service.updateTransaction('tranId','userId')).resolves.toThrow(HttpException);
        });

        it('should throw HttpException if transaction is not active', async () => {
          const transaction: RepeatableTransaction = {
            id: 'tranId',
            total: 100,
            category: 'Other',
            description: 'description',
            name: 'Other',
            accountId: 'accountId',
            repeatStart: new Date('2022-01-01'),
            repeatEnd: new Date('2023-12-31'),
            lastChange: new Date('2022-01-01'),
            repeatMetric: 'Month',
            repeatAmount: 1,
            createdAt: new Date(),
          };
          jest.spyOn(prismaService.repeatableTransaction, 'findUnique').mockResolvedValue(transaction);
          jest.spyOn(prismaService.repeatableTransaction, 'update').mockResolvedValue(transaction);
          jest.spyOn(expenseService, 'create').mockResolvedValue(null);

          await expect(service.updateTransaction('tranId', 'userId')).resolves.toThrow(HttpException);
        });

        it('should throw HttpException if transaction is not active', async () => {
          const transaction: RepeatableTransaction = {
            id: 'tranId',
            total: 100,
            category: 'Other',
            name: 'Other',
            description: 'description',
            accountId: 'accountId',
            repeatStart: new Date('2022-01-01'),
            repeatEnd: new Date('2023-12-31'),
            lastChange: new Date(),
            repeatMetric: 'Year',
            repeatAmount: 1,
            createdAt: new Date(),
          };
          jest.spyOn(prismaService.repeatableTransaction, 'findUnique').mockResolvedValue(transaction);

          await expect(service.updateTransaction('tranId', 'userId')).resolves.toThrow(HttpException);
        });
      });
    });

  });
