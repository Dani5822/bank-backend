import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PurchaseModule } from './purchase/purchase.module';
import { ExpenseModule } from './expense/expense.module';
import { BankAccountsModule } from './bank-accounts/bank-accounts.module';
import { UserTypeModule } from './user-type/user-type.module';

@Module({
  imports: [UserModule, PurchaseModule, ExpenseModule, BankAccountsModule, UserTypeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
