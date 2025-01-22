import { Injectable, NotFoundException } from '@nestjs/common';
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
  async create(data: CreateUserDto) {
    const bcrypt = require('bcrypt');
    const saltRounds = 10;
    return this.db.user.create({
      data: {
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        password: await bcrypt.hash(data.password, saltRounds),
        Expense: undefined,
        Income: undefined,
        Cards: undefined,
      },
    });
  }

  findAll() {
    return this.db.user.findMany();
  }

  findOne(id: string) {
    return this.db.user.findUnique({ where: { id: id } });
  }
  findOnewithbankaccount(id: string) {
    return this.db.user.findUnique({
      where: { id: id },
      include: { Cards: true },
    });
  }

  updatebank(id: string, updateUserDto: UpdateUserDto) {
    return this.db.user.update({
      where: { id: id },
      data: {
        Cards: {
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
      include: { Cards: true },
    });
    if (user && user.Cards.length === 0) {
      return this.db.user.delete({ where: { id: id } });
    } else if (user) {
      const bankaccountswithuser = await this.db.card.findMany({
        where: { userId: { has: id } },
      });
      await bankaccountswithuser.map(async (item) => {
        if (item.userId.length === 1) {
          await new BankAccountsService(this.db).remove(item.id);
        } else {
          await this.db.card.update({
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
      throw new Error('Invalid password or email');
    }
  }
}
