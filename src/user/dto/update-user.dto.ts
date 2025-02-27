import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { UserType } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty()
  expenseid?:string;
  @ApiProperty()
  purchesid?:string;
  @ApiProperty()
  bankaccountid?:string;
  @ApiProperty({enum: UserType})
  Role?: UserType;
}
