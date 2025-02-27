import { Currency } from "@prisma/client"
import { ApiProperty } from '@nestjs/swagger';

export class CreateAccountDto {
    @ApiProperty()
    userId:string
    @ApiProperty({enum:Currency})
    currency:Currency
    @ApiProperty()
    ownerName:string
}

