import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { UserType } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({
    description: 'The ID of the expense associated with the user',
    example: 'expense123',
    required: false
  })
  expenseid?: string;

  @ApiProperty({
    description: 'The ID of the purchase associated with the user',
    example: 'purchase123',
    required: false
  })
  purchesid?: string;

  @ApiProperty({
    description: 'The ID of the bank account associated with the user',
    example: 'bankaccount123',
    required: false
  })
  bankaccountid?: string;

  @ApiProperty({
    enum: UserType,
    description: 'The role of the user',
    example: UserType.User,
    required: false
  })
  Role?: UserType;
}
