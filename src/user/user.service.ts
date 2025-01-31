import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import { AccountsService } from 'src/account/accounts.service';

@Injectable()
export class UserService {
  db: PrismaService;
  constructor(db: PrismaService) {
    this.db = db;
  }
  async create(data: CreateUserDto) {
    const bcrypt = require('bcrypt');
    const saltRounds = 10;
    let user= await this.db.user.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: await bcrypt.hash(data.password, saltRounds),
        Expenses: undefined,
        Incomes: undefined,
        Accounts: undefined,
      },

    });
    await this.db.account.create({
      data:{
        currency: "HUF",
        total: 0,
        ownerName: `${user.firstName} ${user.lastName}`,
        Users: {
          connect: { id: user.id },
        },
      }
    })
    return user;
  }

  findAll() {
    return this.db.user.findMany();
  }

  findOne(id: string) {
    return this.db.user.findUnique({ where: { id: id },include: { Accounts: true } });
  }
  async findOnewithbankaccount(id: string) {
    
    let x= await this.db.user.findUnique({
      where: { id: id },
      include: { Accounts: true },
    });
    return x;
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
      const bankaccountswithuser = await this.db.account.findMany({
        where: { userId: { has: id } },
      });
      await bankaccountswithuser.map(async (item) => {
        if (item.userId.length === 1) {
          await new AccountsService(this.db).remove(item.id);
        } else {
          await this.db.account.update({
            where: { id: item.id },
            data: { userId: item.userId.filter((user) => user !== id) },
          });
        }
      });
      return this.db.user.delete({ where: { id: id } });
    }

    throw new Error('User not found');
  }

  async login(email: string, password: string) {
    const bcrypt = require('bcrypt');
    let x= await this.db.user.findUniqueOrThrow({
      where: { email: email },
    });
    if(!x){
      throw new NotFoundException('User not found');
    }
    if(await bcrypt.compare(password,x.password)){
      return x;
    }else{
      throw new NotFoundException('Invalid password or email');
    }
  }
}
