import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AccountsService {
  db: PrismaService;
  constructor(db: PrismaService) {
    this.db = db;
  }
  create(createAccountDto: CreateAccountDto) {
    return this.db.account.create({
      data: {
        total: 0,
        currency: createAccountDto.currency,
        Users: {
          connect: { id: createAccountDto.userid },
        },
        Expenses: undefined,
        Incomes: undefined,
      },
    });
  }

  findAllbyUserId(id: string) {
    return this.db.account.findMany({
      include: { Users: true, Expenses: true, Incomes: true },
      where: { userId: { has: id } },
    });
  }

  findOne(id: string) {
    return this.db.account.findUnique({ where: { id: id }});
  }

  async updateuser(id: string, updateAccountDto: UpdateAccountDto) {
    await this.db.user.update({
      where: { id: updateAccountDto.userid },
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
          connect: { id: updateAccountDto.userid },
        },
      },
    });
  }

  async remove(id: string) {
    const userwithaccount = await this.db.user.findMany({
      where: { accountId: { has: id } },
    });
    await userwithaccount.map(async (item) => {
      await this.db.user.update({
        where: { id: item.id },
        data: {
          accountId: item.accountId.filter((id) => id !== id),
        },
      });
    });

    return await this.db.account.delete({ where: { id: id } });
  }
}
