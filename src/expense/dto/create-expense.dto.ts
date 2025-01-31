import { ExpenseCategory, Metric } from "@prisma/client";


export class CreateExpenseDto {
  total: number;
  category: ExpenseCategory;
  vendor: string;
  description: string;
  userId: string;
  bankAccountId: string;
  repeatAmount: number;
  repeatMetric: Metric;
  repeatStart: Date;
  repeatEnd: Date;
}
