import { ExpenseCategory } from "@prisma/client";
import { IsOptional } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateExpenseDto {
  @ApiProperty({
    description: 'The total amount of the expense',
    example: 100
  })
  total: number;

  @ApiProperty({
    enum: ExpenseCategory,
    description: 'The category of the expense',
    example: ExpenseCategory.Rent
  })
  category: ExpenseCategory;

  @ApiProperty({
    description: 'A description of the expense',
    example: 'Lunch at a restaurant'
  })
  description?: string;

  @ApiProperty({
    description: 'The ID of the user who made the expense',
    example: 'user123'
  })
  userId: string;

  @ApiProperty({
    description: 'The ID of the bank account associated with the expense',
    example: 'account123'
  })
  bankAccountId: string;

  @ApiProperty({
    description: 'The date when the expense was created',
    example: '2025-02-27T12:34:56Z'
  })
  createdAt?: Date;

  @ApiProperty({
    description: 'The ID of the repeatable transaction associated with the expense',
    example: 'repeatableTransaction123'
  })
  @IsOptional()
  RepeatableTransactionId?: string;
}
