import { ExpenseCategory, Metric } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRepeatableTransactionDto {
  @ApiProperty()
  total: number;
  @ApiProperty({enum: ExpenseCategory})
  category: ExpenseCategory;
  @ApiProperty()
  description?: string;
  @ApiProperty()
  accountId: string;
  @ApiProperty()
  repeatAmount: number;
  @ApiProperty()
  repeatMetric: Metric;
  @ApiProperty()
  repeatStart?: Date;
  @ApiProperty()
  repeatEnd?: Date;
}
