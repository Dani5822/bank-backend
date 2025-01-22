import { Category, Metric } from "@prisma/client";


export class CreateExpenseDto {
  total: number;
  Category: Category;
  vendor: string;
  Description: string;
  userid: string;
  bankaccountid: string;
  repeatammount: number;
  repeatmetric: Metric;
  repeatstart: Date;
}
