import { PartialType } from '@nestjs/mapped-types';
import { CreateAccountDto } from './create-account.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAccountDto extends PartialType(CreateAccountDto) {
  @ApiProperty({
    description: 'The ID of the expense associated with the account',
    example: 'expense123'
  })
  expenseid?: string;

  @ApiProperty({
    description: 'The ID of the purchase associated with the account',
    example: 'purchase123'
  })
  purchaseid?: string;

  @ApiProperty({
    description: 'The total amount in the account',
    example: 1000
  })
  total?: number;
}
