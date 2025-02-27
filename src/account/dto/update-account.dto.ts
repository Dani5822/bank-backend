import { PartialType } from '@nestjs/mapped-types';
import { CreateAccountDto } from './create-account.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAccountDto extends PartialType(CreateAccountDto) {
    @ApiProperty()
    expenseid?:string;
    @ApiProperty()
    purchaseid?:string;
    @ApiProperty()
    total?:number;
}
