import { Injectable } from '@nestjs/common';
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
    const x= await this.db.account.findMany({
      where: { userId: { has: id } },
    });
    if(x.length==0){
      return null;
    }else{
      return x;
    }
  }

  async getAllExpensebyAccountID(id: string) {
    const data= await this.db.expense.findMany({
      where: { accountId: id },
    });

    if(data.length==0){
      return null;}
    return data;
  }
  async getAllIncomebyAccountID(id: string) {
    const data=await this.db.income.findMany({
      where: { accountId: id },
    });
    if(data.length==0){
      return null;}
    return data;
  }

  findOne(id: string) {
    return this.db.account.findUnique({ where: { id: id }});
  }

  findAllUserWithId(id: string) {
    return this.db.account.findUnique({ where: { id: id },include:{Users:true}});
  }

  disconnectUser(id: string, updateAccountDto: UpdateAccountDto) {
    return this.db.account.update({
      where: { id: id },
      data: {
        Users: {
          disconnect: { id: updateAccountDto.userId },
        },
      },
    });
  }

  async connectUserwithemail(id:string,email:string){
    const user=await this.db.user.findUnique({
      where:{email:email}
    });
    if(user==null){
      return null;
    }
    return await this.updateuser(id,{userId: user.id});
    
  }

  async updateuser(id: string, updateAccountDto: UpdateAccountDto) {
    await this.db.user.update({
      where: { id: updateAccountDto.userId },
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
          connect: { id: updateAccountDto.userId },
        },
      },
    });
  }

  async update(id: string, updateAccountDto: UpdateAccountDto) {
    var x= await this.db.account.update({
      where: { id: id },
      data: {
        total: parseFloat(updateAccountDto.total.toString()),
        currency: updateAccountDto.currency,
      },
    });
    console.log(x);
    return x;
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
