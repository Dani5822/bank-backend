import { ForbiddenException, Injectable } from '@nestjs/common';
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
    if (createIncomeDto.total <=0) {
      throw new ForbiddenException('Total must be greater than 0');
    } else {
      const x = await this.db.income.create({
        data: {
          total: parseFloat(createIncomeDto.total.toString()),
          category: createIncomeDto.category,
          description: createIncomeDto.description,
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
            increment: parseFloat(createIncomeDto.total.toString()),
          },
        },
      });
      return x;
    }
  }

  findOne(id: string) {
    return this.db.income.findUnique({
      where: { id: id },
    });
  }

  update(id: string, updateIncomeDto: UpdateIncomeDto) {
    return this.db.income.update({
      where: { id: id },
      data: {
        total: updateIncomeDto.total,
        category: updateIncomeDto.category,
        description: updateIncomeDto.description,
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
