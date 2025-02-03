import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { IncomeModule } from './income/income.module';
import { ExpenseModule } from './expense/expense.module';
import { AccountsModule } from './account/accounts.module';
import { PrismaService } from './prisma.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, IncomeModule, ExpenseModule, AccountsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService,PrismaService],
})
export class AppModule {}
