import { Currency } from "@prisma/client"

export class CreateAccountDto {
    userId:string
    currency:Currency
    ownerName:string
}

