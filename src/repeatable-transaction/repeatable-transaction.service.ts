import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { CreateRepeatableTransactionDto } from './dto/create-repeatable-transaction.dto';
import { UpdateRepeatableTransactionDto } from './dto/update-repeatable-transaction.dto';
import { PrismaService } from 'src/prisma.service';
import { RepeatableTransaction } from '@prisma/client';
import { ExpenseService } from 'src/expense/expense.service';
import { finished } from 'stream';

@Injectable()
export class RepeatableTransactionService {
  constructor(
    private db: PrismaService,
    private expenseService: ExpenseService,
  ) {}
  create(createRepeatableTransactionDto: CreateRepeatableTransactionDto) {
    return this.db.repeatableTransaction.create({
      data: {
        total: parseFloat(createRepeatableTransactionDto.total.toString()),
        category: createRepeatableTransactionDto.category,
        description: createRepeatableTransactionDto.description,
        repeatAmount: parseInt(createRepeatableTransactionDto.repeatAmount.toString()),
        repeatMetric: createRepeatableTransactionDto.repeatMetric,
        repeatStart: new Date(createRepeatableTransactionDto.repeatStart),
        lastChange: new Date(createRepeatableTransactionDto.repeatStart),
        repeatEnd: new Date(createRepeatableTransactionDto.repeatEnd),
        Account: {
          connect: {
            id: createRepeatableTransactionDto.accountId,
          },
        },
      },
    });
  }

  findOne(id: string) {
    return this.db.repeatableTransaction.findUnique({
      where: {
        id: id,
      },
      include: {
        Expenses: true,
      }
    });
  }

  async update(
    id: string,
    updateRepeatableTransactionDto: UpdateRepeatableTransactionDto,
  ) {
    return await this.db.repeatableTransaction.update({
      where: {
        id: id,
      },
      data: {
        ...updateRepeatableTransactionDto,
      },
    });
  }

  getdaymountyear(date: Date) {
    let day = date.getDate()+1;
    let month = date.getUTCMonth()+1;
    let year = date.getUTCFullYear();
    return `${year}-${month}-${day}`;

  }

  async updateTransaction(tranId: string, userId: string) {
    const transaction: RepeatableTransaction =
      await this.db.repeatableTransaction.findUnique({
        where: {
          id: tranId,
        },
      });
    if (transaction == null) {
      throw new NotFoundException('Transaction not found');
    } else {
      let currentDate = new Date(this.getdaymountyear(new Date()));
    
      if (
        new Date(this.getdaymountyear(transaction.repeatStart)) <=
        new Date(this.getdaymountyear(transaction.repeatEnd))
      ) {
        let nextTransactionDate: Date = new Date(transaction.lastChange);

        const createExpenseAndUpdateTransaction = async (nextDate: Date) => {
          await this.expenseService.create({
            total: transaction.total,
            category: transaction.category,
            description: transaction.description,
            bankAccountId: transaction.accountId,
            userId: userId,
            createdAt: nextDate,
            RepeatableTransactionId: transaction.id,
          });
          await this.update(tranId, { lastChange: nextDate });
          return await this.updateTransaction(tranId, userId);
        };

        switch (transaction.repeatMetric) {
          case 'Day':
            nextTransactionDate.setDate(
              nextTransactionDate.getDate() + transaction.repeatAmount,
            );
            break;
          case 'Week':
            nextTransactionDate.setDate(
              nextTransactionDate.getDate() + transaction.repeatAmount * 7,
            );
            break;
          case 'Month':
            nextTransactionDate.setMonth(
              nextTransactionDate.getMonth() + transaction.repeatAmount,
            );
            break;
          case 'Year':
            nextTransactionDate.setFullYear(
              nextTransactionDate.getFullYear() + transaction.repeatAmount,
            );
            break;
        }
        if (new Date(this.getdaymountyear(nextTransactionDate)) <= currentDate && new Date(this.getdaymountyear(nextTransactionDate))<= new Date(this.getdaymountyear(transaction.repeatEnd))) {
          return await createExpenseAndUpdateTransaction(nextTransactionDate);
        } else {
          return transaction;
        }
      } else {
        throw new HttpException(
          'Transaction is not active',
          HttpStatus.I_AM_A_TEAPOT,
        );
      }
    }
  }

  remove(id: string) {
    this.db.expense.deleteMany({
      where: {
        repeatableTransactionId: id,
      }
      });
    return this.db.repeatableTransaction.delete({
      where: {
        id: id,
      },
    });
  }
}
