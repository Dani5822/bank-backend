import { ExpenseCategory, Metric, RepeatableTransaction } from "@prisma/client";
import { IsOptional } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';


export class CreateExpenseDto {
  @ApiProperty()
  total: number;
  @ApiProperty({enum: ExpenseCategory})
  category: ExpenseCategory;
  @ApiProperty()
  description?: string;
  @ApiProperty()
  userId: string;
  @ApiProperty()
  bankAccountId: string;
  @ApiProperty()
  createdAt?: Date;
  @ApiProperty()
  @IsOptional()
  RepeatableTransactionId?: string;
}
