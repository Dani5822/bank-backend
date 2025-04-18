import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { CreateRepeatableTransactionDto } from './dto/create-repeatable-transaction.dto';
import { UpdateRepeatableTransactionDto } from './dto/update-repeatable-transaction.dto';
import { PrismaService } from 'src/prisma.service';
import { Account, RepeatableTransaction } from '@prisma/client';
import { ExpenseService } from 'src/expense/expense.service';
import { console } from 'inspector';

@Injectable()
export class RepeatableTransactionService {
  
  
  constructor(
    private db: PrismaService,
    private expenseService: ExpenseService,
  ) {}
  async create(createRepeatableTransactionDto: CreateRepeatableTransactionDto) {
    const x = await this.db.repeatableTransaction.create({
      data: {
        name: createRepeatableTransactionDto.name,
        total: parseFloat(createRepeatableTransactionDto.total.toString()),
        category: createRepeatableTransactionDto.category,
        description: createRepeatableTransactionDto.description,
        repeatAmount: parseInt(
          createRepeatableTransactionDto.repeatAmount.toString(),
        ),
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
    await this.updateTrans(createRepeatableTransactionDto.accountId,x ,createRepeatableTransactionDto.userId);
    return x;
  }

  findOne(id: string) {
    return this.db.repeatableTransaction.findUnique({
      where: {
        id: id,
      },
    });
  }

  findOneWithExpenses(id: string) {
    return this.db.repeatableTransaction.findUnique({
      where: {
        id: id,
      },
      include: {
        Expenses: true,
      },
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
        total: parseFloat(updateRepeatableTransactionDto.total.toString()),
        name: updateRepeatableTransactionDto.name,
        category: updateRepeatableTransactionDto.category,
        description: updateRepeatableTransactionDto.description,
        repeatAmount: parseInt(updateRepeatableTransactionDto.repeatAmount.toString()),
        repeatMetric: updateRepeatableTransactionDto.repeatMetric,
        repeatStart: new Date(updateRepeatableTransactionDto.repeatStart),
        repeatEnd: new Date(updateRepeatableTransactionDto.repeatEnd),
      },
    });
  }

  async updateLastChange(
    id: string,
    updateRepeatableTransactionDto: UpdateRepeatableTransactionDto,
  ) {
    return await this.db.repeatableTransaction.update({
      where: {
        id: id,
      },
      data: {
        ...updateRepeatableTransactionDto
      },
    });
  }





  getdaymountyear(date: Date) {
    let day = date.getDate() + 1;
    let month = date.getUTCMonth() + 1;
    let year = date.getUTCFullYear();
    return `${year}-${month}-${day}`;
  }

  async updateTrans(accountId, transaction, userId) {
    let currentDate = new Date();
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
      transaction.lastChange = nextDate;
      return await this.updateTrans(accountId, transaction, userId);
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

    if (
      new Date(this.getdaymountyear(nextTransactionDate)) <= currentDate &&
      new Date(this.getdaymountyear(nextTransactionDate)) <=
        new Date(this.getdaymountyear(transaction.repeatEnd))
    ) {
      return await createExpenseAndUpdateTransaction(nextTransactionDate);
    } else {
      this.updateLastChange(transaction.id, { lastChange: transaction.lastChange });
      return transaction;
    }
  }

  async updateTransaction(accountId: string, userId: string) {
    try {
      const account = await this.db.account.findUnique({
        where: { id: accountId },
        include: { RepeatableTransaction: true },
      });
      if (account != null && account.RepeatableTransaction.length > 0) {
        account.RepeatableTransaction.forEach(async (transaction) => {
          await this.updateTrans(accountId, transaction, userId);
        });
        return account;
      } else {
        return new NotFoundException('Account not found');
      }
      
    } catch (error) {
      return new NotFoundException('Account not found');
    }
  }

  stoprepetable(id: string) {
    return this.db.repeatableTransaction.delete({
      where: {
        id: id,
      },
    });
  }

  async remove(id: string) {
    const data = await this.db.repeatableTransaction.findUnique({where: {id:id}, include: {Expenses:true}})

    data.Expenses.forEach(async item => {
      await this.expenseService.remove(item.id)
    })
    return this.db.repeatableTransaction.delete({
      where: {
        id: id,
      },
    });
  }
}
