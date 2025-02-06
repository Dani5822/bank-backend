import { UserType } from '@prisma/client';

export class User {
  id: string;   firstName: string;   lastName: string;   role: UserType;   email: string;   password: string;   expenseId: string[];   incomeId: string[];   createdAt: Date;   updatedAt: Date;   accountId: string[]
}
