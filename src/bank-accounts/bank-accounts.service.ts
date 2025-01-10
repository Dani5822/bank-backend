import { Injectable } from '@nestjs/common';
import { CreateBankAccountDto } from './dto/create-bank-account.dto';
import { UpdateBankAccountDto } from './dto/update-bank-account.dto';
import { PrismaService } from 'src/prisma.service';
import { ObjectId } from 'mongodb';

@Injectable()
export class BankAccountsService {
  db:PrismaService
  constructor(db:PrismaService) {this.db=db}
  create(createBankAccountDto:CreateBankAccountDto) {
    return this.db.bankAccount.create({ 
      data: {
      Users: {
        connect: { id: createBankAccountDto.userid },
      },
      Expense: undefined,
      Purchase: undefined,
    }, });
  }

  findAll(id: string) {
    return this.db.bankAccount.findMany();
  }

  findOne(id: string) {
    return this.db.bankAccount.findUnique({where:{id:id}})
  }

  update(id: string, updateBankAccountDto: UpdateBankAccountDto) {
    return `This action updates a #${id} bankAccount`;
  }

  remove(id: string) {
    return `This action removes a #${id} bankAccount`;
  }
}
