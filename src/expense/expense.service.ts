import { Injectable } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { PrismaService } from 'src/prisma.service';
import { disconnect } from 'process';

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
        category: createExpenseDto.Category,
        vendor: createExpenseDto.vendor,
        description: createExpenseDto.Description,
        repeatAmmount: createExpenseDto.repeatammount,
        repeatMetric: createExpenseDto.repeatmetric,
        repeatStart: new Date(createExpenseDto.repeatstart),
        User: {
          connect: { id: createExpenseDto.userid }
        },
        Account: {
          connect: { id: createExpenseDto.bankaccountid }
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
    return `This action updates a #${id} expense`;
  }

  async remove(id: string) {
    return this.db.expense.delete({ where: { id: id } });
  }
}
