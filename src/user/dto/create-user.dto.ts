import { BankAccount, Expense, Purchase, UserType } from "@prisma/client";

export class CreateUserDto {
  Fristname: string;
  Lastname: string;
  Role: UserType;
  email: string;
  password: string;
  Expense?: Expense[];
  Purchase?: Purchase[];
  Accounts: BankAccount[];
}
