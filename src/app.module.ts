import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { IncomeModule } from './income/income.module';
import { ExpenseModule } from './expense/expense.module';
import { AccountsModule } from './account/accounts.module';
import { PrismaService } from './prisma.service';
import { AuthModule } from './auth/auth.module';
import { RepeatableTransactionService } from './repeatable-transaction/repeatable-transaction.service';
import { RepeatableTransactionController } from './repeatable-transaction/repeatable-transaction.controller';
import { RepeatableTransactionModule } from './repeatable-transaction/repeatable-transaction.module';
import { ExpenseService } from './expense/expense.service';


@Module({
  imports: [UserModule, IncomeModule, ExpenseModule, AccountsModule, AuthModule, RepeatableTransactionModule],
  controllers: [RepeatableTransactionController],
  providers: [PrismaService, RepeatableTransactionService,ExpenseService],
})
export class AppModule {}
