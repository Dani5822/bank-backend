import { Category, Metric } from "@prisma/client";

export class CreatePurchaseDto {
    total:number;
    category:Category;
    Vendor: string;
    description: string;
    userid: string;
    bankaccountid: string;
    repeatammount: number;
    repeatmetric: Metric;
    repeatstart: Date;
}
