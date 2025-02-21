import { Injectable } from '@nestjs/common';
import { CreateIncomeDto } from './dto/create-income.dto';
import { UpdateIncomeDto } from './dto/update-income.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class IncomeService {
  db: PrismaService;
  constructor(db: PrismaService) {
    this.db = db;
  }
  async create(createIncomeDto: CreateIncomeDto) {
    console.log(createIncomeDto);
    const x=await this.db.income.create({
      data: {
        total: parseFloat(createIncomeDto.total.toString()),
        category: createIncomeDto.category,
        description: createIncomeDto.description,
        vendor: createIncomeDto.vendor,
        repeatAmount: parseInt(createIncomeDto.repeatAmount.toString()),
        repeatMetric: createIncomeDto.repeatMetric,
        repeatStart: createIncomeDto.repeatStart,
        repeatEnd: createIncomeDto.repeatEnd,
        User: {
          connect: { id: createIncomeDto.userId },
        },
        Account: {
          connect: { id: createIncomeDto.bankAccountId },
        },
      },
    });
    await this.db.account.update({
      where: { id: createIncomeDto.bankAccountId },
      data: {
        total: {
          increment: parseFloat(createIncomeDto.total.toString())
        }
      }
    })
    return x;
  }

  findAll() {
    return `This action returns all Income`;
  }

  findOne(id: number) {
    return `This action returns a #${id} Income`;
  }

  update(id: string, updateIncomeDto: UpdateIncomeDto) {
    
    return this.db.income.update({
      where: { id: id },
      data: {
        total: updateIncomeDto.total,
        category: updateIncomeDto.category,
        description: updateIncomeDto.description,
        vendor: updateIncomeDto.vendor,
        repeatAmount: updateIncomeDto.repeatAmount,
        repeatMetric: updateIncomeDto.repeatMetric,
        repeatStart: updateIncomeDto.repeatStart,
        repeatEnd: updateIncomeDto.repeatEnd,
        User: {
          connect: { id: updateIncomeDto.userId },
        },
        Account: {
          connect: { id: updateIncomeDto.bankAccountId },
        },
      },
    });
  }

  async remove(id: string) {
    this.db.income.delete({ where: { id: id } });
  }
}
