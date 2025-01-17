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
        Category: createPurchaseDto.category,
        Description: createPurchaseDto.description,
        Vendor: createPurchaseDto.Vendor,
        replicationammount: createPurchaseDto.replicationammount,
        replicationmetric: createPurchaseDto.replicationmetric,
        replicationstart: new Date(createPurchaseDto.replicationstart),
        User: {
          connect: { id: createPurchaseDto.userid },
        },
        Bankaccount: {
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
        Category: updatePurchaseDto.category,
        Description: updatePurchaseDto.description,
        Vendor: updatePurchaseDto.Vendor,
        replicationammount: updatePurchaseDto.replicationammount,
        replicationmetric: updatePurchaseDto.replicationmetric,
        replicationstart: new Date(updatePurchaseDto.replicationstart),
        User: {
          connect: { id: updatePurchaseDto.userid },
        },
        Bankaccount: {
          connect: { id: updatePurchaseDto.bankaccountid },
        },
      },
    });
  }

  async remove(id: string) {
    let x = this.db.income.findUnique({ where: { id: id } });
    const user = await this.db.user.findMany({
      where: { Incomeid: { has: id } },
    });
    const bank = await this.db.bankAccount.findMany({
      where: { Income: { some: { id: id } } },
      include: { Income: true },
    });
    await user.map(async (item) => {
      await this.db.user.update({
        where: { id: item.id },
        data: {
          Incomeid: item.Incomeid.filter((id) => id !== id),
        },
      });
    });
    await bank.map(async (item) => {
      await this.db.bankAccount.update({
        where: { id: item.id },
        data: {
          Income: {
            disconnect: { id: id },
          },
        },
      });
    });
    return this.db.income.findUnique({ where: { id: id },include:{User:true,Bankaccount:true} });
    //this.db.purchase.delete({ where: { id: id } });
  }
}
