import { Injectable } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ExpenseService {
  db:PrismaService
  constructor(db:PrismaService){
    this.db=db
  }
  async create(createExpenseDto: CreateExpenseDto) {
    await this.db.account.update({
      where: { id: createExpenseDto.bankAccountId },
      data: {
        total: {
          decrement: createExpenseDto.total
        }
      }
    })
    return this.db.expense.create({
      data: {
        total: createExpenseDto.total,
        category: createExpenseDto.category,
        vendor: createExpenseDto.vendor,
        description: createExpenseDto.description,
        repeatAmount: createExpenseDto.repeatAmount,
        repeatMetric: createExpenseDto.repeatMetric,
        repeatStart: createExpenseDto.repeatStart,
        repeatEnd: createExpenseDto.repeatEnd,
        User: {
          connect: { id: createExpenseDto.userId }
        },
        Account: {
          connect: { id: createExpenseDto.bankAccountId }
        }
      }
    });
  }

  findAll() {
    return `This action returns all expense`;
  }

  findOne(id: string) {
    return this.db.expense.findUnique({ where: { id: id }, include: { User: true,Account:true} });
  }

  update(id: string, updateExpenseDto: UpdateExpenseDto) {
    return this.db.expense.update({
      where: { id: id },
      data: {
        total: updateExpenseDto.total,
        category: updateExpenseDto.category,
        description: updateExpenseDto.description,
        vendor: updateExpenseDto.vendor,
        repeatAmount: updateExpenseDto.repeatAmount,
        repeatMetric: updateExpenseDto.repeatMetric,
        repeatStart: updateExpenseDto.repeatStart,
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
    return this.db.expense.delete({ where: { id: id } });
  }
}
