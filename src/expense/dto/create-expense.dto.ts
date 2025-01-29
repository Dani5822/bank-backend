import { Category, Metric } from "@prisma/client";


export class CreateExpenseDto {
  total: number;
  Category: Category;
  vendor: string;
  Description: string;
  userId: string;
  bankAccountId: string;
  repeatAmount: number;
  repeatMetric: Metric;
  repeatStart: Date;
  repeatEnd: Date;
}
