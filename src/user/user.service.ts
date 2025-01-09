import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import { ObjectId } from 'mongodb';

@Injectable()
export class UserService {
  db: PrismaService;
  constructor(db:PrismaService) {this.db=db};
  create(data: CreateUserDto) {
    return this.db.user.create({
      data: {
        Fristname: data.Fristname,
        Lastname: data.Lastname,
        Role: data.Role,
        email: data.email,
        password: data.password,
        Expense: data.Expense ? {
          create: data.Expense.map(expense => ({
            ...expense,
            id: expense.id,
            Bankaccount: expense.bankaccountId ? { connect: { id: expense.bankaccountId } } : undefined,
          })),
        } : undefined,
        Purchase: data.Purchase ? {
          create: data.Purchase.map(purchase => ({
            ...purchase,
            id: purchase.id,
            Bankaccount: purchase.bankaccountId ? { connect: { id: new ObjectId(purchase.bankaccountId) } } : undefined,
          })),
        } : undefined,
        Accounts: data.Accounts ? {
          create: data.Accounts.map(account => ({
            ...account,
            id: new ObjectId(account.id),
          })),
        } : undefined,
      },
    });
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
