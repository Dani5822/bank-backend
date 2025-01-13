import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import { BankAccountsService } from 'src/bank-accounts/bank-accounts.service';

@Injectable()
export class UserService {
  db: PrismaService;
  constructor(db: PrismaService) {
    this.db = db;
  }
  create(data: CreateUserDto) {
    return this.db.user.create({
      data: {
        Fristname: data.Fristname,
        Lastname: data.Lastname,
        email: data.email,
        password: data.password,
        Expense: undefined,
        Purchase: undefined,
        Accounts: undefined,
      },
    });
  }

  findAll() {
    return 'This action returns all bankAccounts';
  }

  findOne(id: string) {
    return this.db.user.findUnique({ where: { id: id } });
  }
  findOnewithbankaccount(id: string) {
    return this.db.user.findUnique({
      where: { id: id },
      include: { Accounts: true },
    });
  }

  updatebank(id: string, updateUserDto: UpdateUserDto) {
    return this.db.user.update({
      where: { id: id },
      data: {
        Accounts: {
          connect: { id: updateUserDto.bankaccountid },
        },
      },
    });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: string) {
    const user = await this.db.user.findUnique({
      where: { id: id },
      include: { Accounts: true },
    });
    if (user && user.Accounts.length === 0) {
      return this.db.user.delete({ where: { id: id } });
    } else if (user) {
      const bankaccountswithuser = await this.db.bankAccount.findMany({
        where: { userId: { has: id } },
      });
      await bankaccountswithuser.map(async (item) => {
        if (item.userId.length === 1) {
          await new BankAccountsService(this.db).remove(item.id);
        } else {
          await this.db.bankAccount.update({
            where: { id: item.id },
            data: { userId: item.userId.filter((user) => user !== id) },
          });
        }
      });
      return this.db.user.delete({ where: { id: id } });
    }

    throw new Error('User not found');
  }
}
