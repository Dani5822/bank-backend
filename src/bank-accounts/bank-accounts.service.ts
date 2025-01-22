import { Injectable } from '@nestjs/common';
import { CreateBankAccountDto } from './dto/create-bank-account.dto';
import { UpdateBankAccountDto } from './dto/update-bank-account.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class BankAccountsService {
  db: PrismaService;
  constructor(db: PrismaService) {
    this.db = db;
  }
  create(createBankAccountDto: CreateBankAccountDto) {
    return this.db.card.create({
      data: {
        total: 0,
        currency: createBankAccountDto.currency,
        Users: {
          connect: { id: createBankAccountDto.userid },
        },
        Expense: undefined,
        Income: undefined,
      },
    });
  }

  findAllbyUserId(id: string) {
    return this.db.card.findMany({
      include: { Users: true },
      where: { userId: { has: id } },
    });
  }

  findOne(id: string) {
    return this.db.card.findUnique({ where: { id: id } });
  }

  async updateuser(id: string, updateBankAccountDto: UpdateBankAccountDto) {
    await this.db.user.update({
      where: { id: updateBankAccountDto.userid },
      data: {
        Cards: {
          connect: { id: id },
        },
      },
    });
    return this.db.card.update({
      where: { id: id },
      data: {
        Users: {
          connect: { id: updateBankAccountDto.userid },
        },
      },
    });
  }

  async remove(id: string) {
    const userwithbankaccount = await this.db.user.findMany({
      where: { cardid: { has: id } },
    });
    await userwithbankaccount.map(async (item) => {
      await this.db.user.update({
        where: { id: item.id },
        data: {
          cardid: item.cardid.filter((bankid) => bankid !== id),
        },
      });
    });

    return await this.db.card.delete({ where: { id: id } });
  }
}
