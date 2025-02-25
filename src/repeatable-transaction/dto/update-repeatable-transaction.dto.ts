import { PartialType } from '@nestjs/mapped-types';
import { CreateRepeatableTransactionDto } from './create-repeatable-transaction.dto';

export class UpdateRepeatableTransactionDto extends PartialType(CreateRepeatableTransactionDto) {
    lastChange:Date;
}
