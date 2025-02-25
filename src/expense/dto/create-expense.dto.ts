import { ExpenseCategory, Metric } from "@prisma/client";


export class CreateExpenseDto {
  total: number;
  category: ExpenseCategory;
  description?: string;
  userId: string;
  bankAccountId: string;
  createdAt?: Date;
}
