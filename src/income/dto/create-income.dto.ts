import { Category, Metric } from "@prisma/client";

export class CreateIncomeDto {
    total:number;
    category:Category;
    Vendor: string;
    description: string;
    userid: string;
    bankAccountId: string;
    repeatAmount: number;
    repeatMetric: Metric;
    repeatStart: Date;
}
