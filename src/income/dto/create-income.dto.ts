import { IncomeCategory, Metric } from "@prisma/client";

export class CreateIncomeDto {
    total:number;
    category:IncomeCategory;
    Vendor: string;
    description: string;
    userid: string;
    bankAccountId: string;
    repeatAmount: number;
    repeatMetric: Metric;
    repeatStart: Date;
    repeatEnd: Date;
}
