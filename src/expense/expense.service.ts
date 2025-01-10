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
  create(createExpenseDto: CreateExpenseDto) {
    return this.db.expense.create({
      data: {
        total: createExpenseDto.total,
        Category: createExpenseDto.Category,
        Description: createExpenseDto.Description,
        replicationammount: createExpenseDto.replicationammount,
        replicationmetric: createExpenseDto.replicationmetric,
        replicationstart: new Date(createExpenseDto.replicationstart),
        replicationend: new Date(createExpenseDto.replicationend),
        User: {
          connect: { id: createExpenseDto.userid[0] }
        },
        Bankaccount: {
          connect: { id: createExpenseDto.bankaccountid }
        }
      }
    });
  }

  findAll() {
    return `This action returns all expense`;
  }

  findOne(id: number) {
    return `This action returns a #${id} expense`;
  }

  update(id: number, updateExpenseDto: UpdateExpenseDto) {
    return `This action updates a #${id} expense`;
  }

  remove(id: number) {
    return `This action removes a #${id} expense`;
  }
}
