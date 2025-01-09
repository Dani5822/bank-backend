import { BankAccounts, User } from '@prisma/client';

export class CreateExpenseDto {
  id: number;
  total: number;
  category: string;
  Description: string;
  User: User[];
  BankAccount: BankAccounts;
  createdAt: Date;
  updatedAt: Date;
  replicationammount: number;
  replicationmetric: string;
  replicationstart: Date;
  replicationend: Date;
}
