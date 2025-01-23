import { Module } from '@nestjs/common';
import { BankAccountsService } from './accounts.service';
import { BankAccountsController } from './accounts.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [BankAccountsController],
  providers: [BankAccountsService,PrismaService],
})
export class BankAccountsModule {}
