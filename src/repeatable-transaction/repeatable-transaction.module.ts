import { Module } from '@nestjs/common';
import { RepeatableTransactionService } from './repeatable-transaction.service';
import { RepeatableTransactionController } from './repeatable-transaction.controller';
import { PrismaService } from 'src/prisma.service';
import { ExpenseService } from 'src/expense/expense.service';

@Module({
  controllers: [RepeatableTransactionController],
  providers: [RepeatableTransactionService,PrismaService,ExpenseService],
})
export class RepeatableTransactionModule {}
