import { IncomeCategory } from "@prisma/client";
import { ApiProperty } from '@nestjs/swagger';

export class CreateIncomeDto {
  @ApiProperty({
    description: 'The total amount of the income',
    example: 500
  })
  total: number;

  @ApiProperty({
    enum: IncomeCategory,
    description: 'The category of the income',
    example: IncomeCategory.Salary
  })
  category: IncomeCategory;

  @ApiProperty({
    description: 'A description of the income',
    example: 'Monthly salary'
  })
  description: string;

  @ApiProperty({
    description: 'The ID of the user who received the income',
    example: 'user123'
  })
  userId: string;

  @ApiProperty({
    description: 'The ID of the bank account associated with the income',
    example: 'account123'
  })
  bankAccountId: string;

  @ApiProperty({
    description: 'The date when the income was created',
    example: '2025-02-27T12:34:56Z'
  })
  createdAt?: Date;
}
