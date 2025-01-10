import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { BankAccount, Expense, Purchase, UserType } from '@prisma/client';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    Expense?: Expense[];
  Purchase?: Purchase[];
  Accounts?: BankAccount[];
  Role: UserType;
}
