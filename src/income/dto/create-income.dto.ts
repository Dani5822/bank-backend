import { IncomeCategory, Metric } from "@prisma/client";

export class CreateIncomeDto {
    total:number;
    category:IncomeCategory;
    vendor: string;
    description: string;
    userId: string;
    bankAccountId: string;
}
