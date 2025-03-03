import { Currency } from "@prisma/client"
import { ApiProperty } from '@nestjs/swagger';

export class CreateAccountDto {
  @ApiProperty({
    description: 'The ID of the user who owns the account',
    example: '12345'
  })
  userId: string;

  @ApiProperty({
    enum: Currency,
    description: 'The currency of the account',
    example: Currency.USD
  })
  currency: Currency;

  @ApiProperty({
    description: 'The name of the account owner',
    example: 'John Doe'
  })
  ownerName: string;
}

