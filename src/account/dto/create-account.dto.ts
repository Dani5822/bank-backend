import { Currency } from "@prisma/client"

export class CreateBankAccountDto {
    userid:string
    currency:Currency
}

