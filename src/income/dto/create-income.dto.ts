import { Category, Metric } from "@prisma/client";

export class CreateIncomeDto {
    total:number;
    category:Category;
    Vendor: string;
    description: string;
    userid: string;
    bankaccountid: string;
    repeatamount: number;
    repeatmetric: Metric;
    repeatstart: Date;
}
