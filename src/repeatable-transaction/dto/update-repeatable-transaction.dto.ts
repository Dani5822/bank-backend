import { PartialType } from '@nestjs/mapped-types';
import { CreateRepeatableTransactionDto } from './create-repeatable-transaction.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateRepeatableTransactionDto extends PartialType(CreateRepeatableTransactionDto) {
    @ApiProperty({
        description: 'The date when the repeatable transaction was last changed',
        example: '2025-04-01T00:00:00Z'
      })
    lastChange:Date;
}
