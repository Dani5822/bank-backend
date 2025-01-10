import { Injectable } from '@nestjs/common';
import { CreateBankAccountDto } from './dto/create-bank-account.dto';
import { UpdateBankAccountDto } from './dto/update-bank-account.dto';
import { PrismaService } from 'src/prisma.service';

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

  findAll() {
    return `This action returns all bankAccounts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bankAccount`;
  }

  update(id: number, updateBankAccountDto: UpdateBankAccountDto) {
    return `This action updates a #${id} bankAccount`;
  }

  remove(id: number) {
    return `This action removes a #${id} bankAccount`;
  }
}
