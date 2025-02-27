import { IncomeCategory, Metric } from "@prisma/client";
import { ApiProperty } from '@nestjs/swagger';

export class CreateIncomeDto {
    @ApiProperty()
    total:number;
    @ApiProperty({enum:IncomeCategory})
    category:IncomeCategory;
    @ApiProperty()
    description: string;
    @ApiProperty()
    userId: string;
    @ApiProperty()
    bankAccountId: string;
    @ApiProperty()
    createdAt?:Date;
}
