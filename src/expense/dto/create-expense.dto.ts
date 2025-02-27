import { ExpenseCategory, Metric, RepeatableTransaction } from "@prisma/client";
import { IsOptional } from "class-validator";


export class CreateExpenseDto {
  total: number;
  category: ExpenseCategory;
  description?: string;
  userId: string;
  bankAccountId: string;
  createdAt?: Date;
  @IsOptional()
  RepeatableTransactionId?: string;
}
