import { Currency } from "@prisma/client"

export class CreateAccountDto {
    userid:string
    currency:Currency
}

