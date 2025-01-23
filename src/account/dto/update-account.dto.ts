import { PartialType } from '@nestjs/mapped-types';
import { CreateBankAccountDto } from './create-account.dto';

export class UpdateBankAccountDto extends PartialType(CreateBankAccountDto) {
    expenseid:string;
    purchaseid:string;
}
