import { BankAccounts, User } from "@prisma/client";

export class CreatePurchaseDto {
    id:number;
    total:number;
    Product: string;
    Vendor: string;
    User:User[];
    BankAccount: BankAccounts;
    createdAt: Date;
    updatedAt: Date;
    replicationammount: number;
    replicationmetric: string;
    replicationstart: Date;
    replicationend: Date;
}
