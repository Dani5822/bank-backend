import { ExpenseCategory, Metric } from '@prisma/client';

export class CreateRepeatableTransactionDto {
  total: number;
  category: ExpenseCategory;
  description?: string;
  accountId: string;
  repeatAmount: number;
  repeatMetric: Metric;
  repeatStart?: Date;
  repeatEnd?: Date;
}
