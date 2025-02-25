import { IncomeCategory, Metric } from "@prisma/client";

export class CreateIncomeDto {
    total:number;
    category:IncomeCategory;
    description: string;
    userId: string;
    bankAccountId: string;
    createdAt?:Date;
}
