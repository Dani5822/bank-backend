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
    return this.db.account.create({
      data: {
        total: 0,
        currency: createBankAccountDto.currency,
        Users: {
          connect: { id: createBankAccountDto.userid },
        },
        Expenses: undefined,
        Incomes: undefined,
      },
    });
  }

  findAllbyUserId(id: string) {
    return this.db.account.findMany({
      include: { Users: true },
      where: { userId: { has: id } },
    });
  }

  findOne(id: string) {
    return this.db.account.findUnique({ where: { id: id } });
  }

  async updateuser(id: string, updateBankAccountDto: UpdateBankAccountDto) {
    await this.db.user.update({
      where: { id: updateBankAccountDto.userid },
      data: {
        Accounts: {
          connect: { id: id },
        },
      },
    });
    return this.db.account.update({
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
      where: { accountId: { has: id } },
    });
    await userwithbankaccount.map(async (item) => {
      await this.db.user.update({
        where: { id: item.id },
        data: {
          accountId: item.accountId.filter((bankid) => bankid !== id),
        },
      });
    });

    return await this.db.account.delete({ where: { id: id } });
  }
}
