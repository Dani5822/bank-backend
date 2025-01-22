import { Injectable } from '@nestjs/common';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PurchaseService {
  db: PrismaService;
  constructor(db: PrismaService) {
    this.db = db;
  }
  create(createPurchaseDto: CreatePurchaseDto) {
    return this.db.income.create({
      data: {
        total: createPurchaseDto.total,
        category: createPurchaseDto.category,
        description: createPurchaseDto.description,
        vendor: createPurchaseDto.Vendor,
        repeatAmmount: createPurchaseDto.repeatammount,
        repeatMetric: createPurchaseDto.repeatmetric,
        repeatStart: new Date(createPurchaseDto.repeatstart),
        User: {
          connect: { id: createPurchaseDto.userid },
        },
        Account: {
          connect: { id: createPurchaseDto.bankaccountid },
        },
      },
    });
  }

  findAll() {
    return `This action returns all purchase`;
  }

  findOne(id: number) {
    return `This action returns a #${id} purchase`;
  }

  update(id: string, updatePurchaseDto: UpdatePurchaseDto) {
    return this.db.income.update({
      where: { id: id },
      data: {
        total: updatePurchaseDto.total,
        category: updatePurchaseDto.category,
        description: updatePurchaseDto.description,
        vendor: updatePurchaseDto.Vendor,
        repeatAmmount: updatePurchaseDto.repeatammount,
        repeatMetric: updatePurchaseDto.repeatmetric,
        repeatStart: new Date(updatePurchaseDto.repeatstart),
        User: {
          connect: { id: updatePurchaseDto.userid },
        },
        Account: {
          connect: { id: updatePurchaseDto.bankaccountid },
        },
      },
    });
  }

  async remove(id: string) {
    this.db.income.delete({ where: { id: id } });
  }
}
