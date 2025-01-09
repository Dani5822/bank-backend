import { BankAccounts, Expense, Purchase, UserType } from "@prisma/client";

export class CreateUserDto {
  id: String;
  Fristname: String;
  Lastname: String;
  Role: UserType;
  email: String;
  password: String;
  Expense: Expense[];
  Purchase: Purchase[];
  createdAt: Date;
  updatedAt: Date;
  Accounts: BankAccounts[];
}
