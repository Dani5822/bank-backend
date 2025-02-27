import { PartialType } from '@nestjs/mapped-types';
import { CreateRepeatableTransactionDto } from './create-repeatable-transaction.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateRepeatableTransactionDto extends PartialType(CreateRepeatableTransactionDto) {
    @ApiProperty()
    lastChange:Date;
}
