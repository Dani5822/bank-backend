import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { PrismaService } from '../prisma.service';

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
        ownerName: createAccountDto.ownerName,
        Users: {
          connect: { id: createAccountDto.userId },
        },
        Expenses: undefined,
        Incomes: undefined,
      },
    });
  }

  async findAllbyUserId(id: string) {
    const x = await this.db.account.findMany({
      where: { userId: { has: id } },
    });
    if (x.length == 0) {
      return null;
    } else {
      return x;
    }
  }

  async findAllWithUser(userid: string) {
    const user = await this.db.user.findUnique({
      where: { id: userid },
      include: { Accounts: true }, // Include related accounts
    });

    if (!user) {
      throw new Error('User not found');
    }

    return user.Accounts;
  }

  async getAllExpensebyAccountID(id: string) {
    const data = await this.db.expense.findMany({
      where: { accountId: id },
    });

    if (data.length == 0) {
      return null;
    }
    return data;
  }
  async getAllIncomebyAccountID(id: string) {
    const data = await this.db.income.findMany({
      where: { accountId: id },
    });
    if (data.length == 0) {
      return null;
    }
    return data;
  }

  findOne(id: string) {
    return this.db.account.findUnique({ where: { id: id } });
  }

  findAllUserWithId(id: string) {
    return this.db.account.findUnique({
      where: { id: id },
      include: { Users: true },
    });
  }

  disconnectUser(id: string, userId: string) {
    const data = this.db.account.update({
      where: { id: id },
      data: {
        Users: {
          disconnect: { id: userId },
        },
      },
    });
    return data;
  }

  async connectUserwithemail(id: string, email: string) {
    const user = await this.db.user.findUnique({
      where: { email: email },
    });
    if (user == null) {
      return null;
    }
    return await this.updateuser(id, { userId: user.id });
  }

  async updateuser(id: string, updateAccountDto: UpdateAccountDto) {
    const user = await this.db.user.findUnique({
      where: { id: updateAccountDto.userId },
    });
    const account = await this.db.account.findUnique({ where: { id: id } });
    if (
      !(
        account.userId.includes(updateAccountDto.userId) ||
        user.accountId.includes(id)
      )
    ) {
      await this.db.user.update({
        where: { id: updateAccountDto.userId },
        data: {
          accountId: {
            push: id,
          },
        },
      });
      return this.db.account.update({
        where: { id: id },
        data: {
          userId: {
            push: updateAccountDto.userId,
          },
        },
      });
    }else{
      throw new NotFoundException('User already connected'); 
    }
  }

  async update(id: string, updateAccountDto: UpdateAccountDto) {
    var x = await this.db.account.update({
      where: { id: id },
      data: {
        total: parseFloat(updateAccountDto.total.toString()),
        currency: updateAccountDto.currency,
      },
    });

    return x;
  }

  async transfer(data: {
    userId: string;
    accountfrom: string;
    accountto: string;
    amount: number;
  }) {
    const accountfrom = await this.db.account.findUnique({
      where: { id: data.accountfrom },
    });
    const accountto = await this.db.account.findUnique({
      where: { id: data.accountto },
    });
    if (accountfrom == null || accountto == null) {
      throw new NotFoundException('Account not found');
    }
    if (accountfrom.total < data.amount) {
      return null;
    }
    await this.db.account.update({
      where: { id: data.accountfrom },
      data: {
        total: accountfrom.total - data.amount,
        Expenses: {
          create: {
            total: data.amount,
            category: 'Transfer',
            description: 'Transfer',
            userId: data.userId,
          },
        },
      },
    });
    await this.db.account.update({
      where: { id: data.accountto },
      data: {
        total: accountto.total + data.amount,
        Incomes: {
          create: {
            total: data.amount,
            category: 'Transfer',
            description: 'Transfer',
            userId: data.userId,
          },
        },
      },
    });
    return accountfrom;
  }
  async remove(id: string) {
    const userwithaccount = await this.db.user.findMany({
      where: { accountId: { has: id } },
    });
    userwithaccount.map(async (item) => {
      await this.db.user.update({
        where: { id: item.id },
        data: {
          accountId: {
            set: item.accountId.filter((x) => x !== id),
          },
        },
      });
    });

    await this.db.income.deleteMany({
      where: { accountId: id },
    });

    await this.db.expense.deleteMany({
      where: { accountId: id },
    });

    let x = await this.db.account.delete({ where: { id: id } });
    console.log(x);
    return x;
  }
}
