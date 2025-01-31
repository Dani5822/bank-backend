import { ExpenseCategory, Metric } from "@prisma/client";


export class CreateExpenseDto {
  total: number;
  Category: ExpenseCategory;
  vendor: string;
  Description: string;
  userId: string;
  bankAccountId: string;
  repeatAmount: number;
  repeatMetric: Metric;
  repeatStart: Date;
  repeatEnd: Date;
}
