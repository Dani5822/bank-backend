import { Expense, Purchase, User } from "@prisma/client";

export class CreateBankAccountDto {
    id: number;
    User: User[];
    Expenses: Expense[];
    Purchase: Purchase[];
    createdAt: Date;
    updatedAt: Date;
}
