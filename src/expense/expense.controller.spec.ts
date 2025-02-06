import { Test, TestingModule } from '@nestjs/testing';
import { ExpenseController } from './expense.controller';
import { ExpenseService } from './expense.service';
import { PrismaService } from 'src/prisma.service';
import { AuthService } from 'src/auth/auth.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { JwtService } from '@nestjs/jwt';
import { NotFoundException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { ExpenseCategory, Metric, PrismaClient } from '@prisma/client';

describe('ExpenseController', () => {
  let controller: ExpenseController;
    let service: ExpenseService;

  const testArray : any = [
      {
      total: 12000,
      category: "string" as ExpenseCategory,
      vendor: "string",
      description: "string",
      userId: ["userId1","asd"],
      bankAccountId: ["banckAccId1","asd"],
      repeatAmount: 12,
      repeatMetric: "Day" as Metric,
      repeatStart: new Date,
      repeatEnd: new Date,
      },
      {
      total: 2000000,
      category: "string",
      vendor: "string",
      description: "string",
      userId: ["userId2","asd"],
      bankAccountId: ["banckAccId2","asd"],
      repeatAmount: 1,
      repeatMetric: "Day",
      repeatStart: new Date,
      repeatEnd: new Date,
      }
    ]

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExpenseController],
            providers: [ExpenseService,PrismaService,AuthService,AuthGuard,JwtService,UserService],
    }).compile();

    controller = module.get<ExpenseController>(ExpenseController);
  });

  it('should return a list of all income', () => {
    jest.spyOn(service,"findAll").mockReturnValue(testArray);
    expect(controller.findAll()).toBe(testArray);
  });

  it('should return one income where id matches', () => {  
    jest.spyOn(service,"findOne").mockReturnValue(testArray[0]);
    expect(controller.findOne("1")).toEqual(testArray[0]);
  });

  it('should not be defined findOne', () => {
    jest.spyOn(service,"findOne").mockReturnValue(null);
    expect(() => controller.findOne("1")).toThrow(NotFoundException);
  })

  it('should create a new income', async () => {
    jest.spyOn(service, 'create').mockResolvedValue(testArray[0]);
    await expect(controller.create(testArray[0])).resolves.toBe(testArray[0]);
  });
});

