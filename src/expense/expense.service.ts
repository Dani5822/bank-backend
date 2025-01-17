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
        Category: createExpenseDto.Category,
        Vendor: createExpenseDto.vendor,
        Description: createExpenseDto.Description,
        replicationammount: createExpenseDto.replicationammount,
        replicationmetric: createExpenseDto.replicationmetric,
        replicationstart: new Date(createExpenseDto.replicationstart),
        User: {
          connect: { id: createExpenseDto.userid }
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

  findOne(id: string) {
    return this.db.expense.findUnique({ where: { id: id }, include: { User: true,Bankaccount:true} });
  }

  update(id: string, updateExpenseDto: UpdateExpenseDto) {
    return `This action updates a #${id} expense`;
  }

  async remove(id: string) {
    return this.db.expense.delete({ where: { id: id } });
  }
}
