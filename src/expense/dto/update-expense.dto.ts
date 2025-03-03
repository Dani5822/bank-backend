import { PartialType } from '@nestjs/mapped-types';
import { CreateExpenseDto } from './create-expense.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateExpenseDto extends PartialType(CreateExpenseDto) {}
