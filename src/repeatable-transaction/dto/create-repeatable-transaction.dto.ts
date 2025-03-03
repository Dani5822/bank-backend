import { ExpenseCategory, Metric } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRepeatableTransactionDto {
  @ApiProperty({
    description: 'The total amount of the repeatable transaction',
    example: 100
  })
  total: number;

  @ApiProperty({
    enum: ExpenseCategory,
    description: 'The category of the repeatable transaction',
    example: ExpenseCategory.Rent
  })
  category: ExpenseCategory;

  @ApiProperty({
    description: 'A description of the repeatable transaction',
    example: 'Monthly rent payment'
  })
  description?: string;

  @ApiProperty({
    description: 'The ID of the account associated with the repeatable transaction',
    example: 'account123'
  })
  accountId: string;

  @ApiProperty({
    description: 'The number of repeat interval (e.g., DAY, WEEK, MONTH) between the transaction',
    example: 12
  })
  repeatAmount: number;

  @ApiProperty({
    enum: Metric,
    description: 'The metric for the repeat interval (e.g., DAY, WEEK, MONTH)',
    example: Metric.Day
  })
  repeatMetric: Metric;

  @ApiProperty({
    description: 'The start date of the repeatable transaction',
    example: '2025-03-01T00:00:00Z'
  })
  repeatStart?: Date;

  @ApiProperty({
    description: 'The end date of the repeatable transaction',
    example: '2026-03-01T00:00:00Z'
  })
  repeatEnd?: Date;
}
