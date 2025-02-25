import { Account, ExpenseCategory, Metric } from '@prisma/client';

export class RepeatableTransaction {
  id: string;
  repeatStart: Date;
  repeatAmount: number;
  repeatMetric: Metric;
  repeatEnd: Date;
  lastChange: Date;
  Account: Account;
  accountId: String;
  createdAt: Date;
  total: number;
  category: ExpenseCategory;
  description?: String;
}
