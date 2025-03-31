import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { PrismaService } from 'src/prisma.service';
import exp from 'constants';

@Injectable()
export class ExpenseService {
  db: PrismaService;
  constructor(db: PrismaService) {
    this.db = db;
  }
  async create(createExpenseDto: CreateExpenseDto) {
    if (createExpenseDto.total <=0) {
      throw new ForbiddenException('Total must be greater than 0');
    } else {
      let x = null;
      if (createExpenseDto.RepeatableTransactionId) {
        x = await this.db.expense.create({
          data: {
            total: parseFloat(createExpenseDto.total.toString()),
            category: createExpenseDto.category,
            description: createExpenseDto.description,
            User: {
              connect: { id: createExpenseDto.userId },
            },
            Account: {
              connect: { id: createExpenseDto.bankAccountId },
            },
            RepeatableTransaction: {
              connect: { id: createExpenseDto.RepeatableTransactionId },
            },
            createdAt: createExpenseDto.createdAt,
          },
        });
      } else {
        x = await this.db.expense.create({
          data: {
            total: parseFloat(createExpenseDto.total.toString()),
            category: createExpenseDto.category,
            description: createExpenseDto.description,
            User: {
              connect: { id: createExpenseDto.userId },
            },
            Account: {
              connect: { id: createExpenseDto.bankAccountId },
            },
          },
        });
      }
      await this.db.account.update({
        where: { id: createExpenseDto.bankAccountId },
        data: {
          total: {
            decrement: parseFloat(createExpenseDto.total.toString()),
          },
        },
      });
      return x;
    }
  }

  findOne(id: string) {
    return this.db.expense.findUnique({
      where: { id: id },
    });
  }

  update(id: string, updateExpenseDto: UpdateExpenseDto) {
    return this.db.expense.update({
      where: { id: id },
      data: {
        total: updateExpenseDto.total,
        category: updateExpenseDto.category,
        description: updateExpenseDto.description,
        User: {
          connect: { id: updateExpenseDto.userId },
        },
        Account: {
          connect: { id: updateExpenseDto.bankAccountId },
        },
      },
    });
  }

  async remove(id: string) {
    const expense = await this.db.expense.findUnique({where: {id:id}});
    await this.db.account.update({
      where: { 
        id:expense.accountId
       },
      data: {
        total: {
          increment: expense.total,
        },
      },
    });
    return this.db.expense.delete({ where: { id: id } });
  }
}
