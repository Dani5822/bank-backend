import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class AccountsService {

  async getAllRepetableTransaction(id: string) {
    const acc=await this.db.account.findUnique({
      where:{id:id},
      include:{RepeatableTransaction:true},
    });

    return acc.RepeatableTransaction;
  }

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
        ownerId: createAccountDto.userId,
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
      include: { Accounts: true },
      
    });
    if (!user) {
      throw new Error('User not found');
    }

    let x=user.Accounts;
    let resoult=user;
    resoult.Accounts=[];
    user.accountId.forEach(element => {
      resoult.Accounts.push(x.find((x)=>x.id==element));
    });

    return resoult.Accounts;
  }

  async getAllExpensebyAccountID(id: string) {
    let data = null;
    try {
      data = await this.db.expense.findMany({
        where: { accountId: id },
      });
      
    } catch (error) {
      return new HttpException('Not Found', 404);
    }

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

  async findAllUserWithId(id: string) {
    const ac=await this.db.account.findUnique({
      where: { id: id },
      include: { Users: true },
    });

    let x=ac.Users;
    let resoult=ac;
    resoult.Users=[];
    ac.userId.forEach(element => {
      resoult.Users.push(x.find((x)=>x.id==element));
    });

    return ac

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
    
      await this.db.user.update({
        where: { id: updateAccountDto.userId },
        data: {
          accountId: {
            push: id,
          },
        },
      });
      return await this.db.account.update({
        where: { id: id },
        data: {
          userId: {
            push: updateAccountDto.userId,
          },
        },
      });
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
            description: `Transfer to: ${accountto.ownerName}`,
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
            description: `Transfer from: ${accountfrom.ownerName}`,
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

    await this.db.repeatableTransaction.deleteMany({
      where: { accountId: id },});

    let x = await this.db.account.delete({ where: { id: id } });
    return x;
  }
}
