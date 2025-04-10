import { Test, TestingModule } from '@nestjs/testing';
import { ExpenseController } from './expense.controller';
import { ExpenseService } from './expense.service';
import { PrismaService } from 'src/prisma.service';
import { AuthService } from 'src/auth/auth.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { ExpenseCategory, Metric } from '@prisma/client';
import { BadRequestException, NotFoundException } from '@nestjs/common';

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
    service = module.get<ExpenseService>(ExpenseService);
  });

  it('should return one expense where id matches', () => {  
    jest.spyOn(service,"findOne").mockReturnValue(testArray[0]);
    expect(controller.findOne("1")).toEqual(testArray[0]);
  });

  it('should not be defined findOne', () => {
    jest.spyOn(service,"findOne").mockReturnValue(null);
    expect(() => controller.findOne("1")).toThrow(NotFoundException);
  })

  it('should create a new expense', async () => {
    jest.spyOn(service, 'create').mockResolvedValue(testArray[0]);
    await expect(controller.create(testArray[0])).resolves.toBe(testArray[0]);
  });

    it('should throw BadRequestException when create fails', async () => {
      jest.spyOn(service, 'create').mockRejectedValue(new BadRequestException('Bad Request'));
      await expect(controller.create(testArray[0])).rejects.toThrow(BadRequestException);
    });

  it('should update an expense', () => {
    const updateDto = { ...testArray[0], total: 1000 };
    jest.spyOn(service, 'update').mockResolvedValue(updateDto);
    expect(controller.update("1",testArray[0])).resolves.toBe(updateDto);
  });

  it('should delete an expense', () => {
    jest.spyOn(service, 'remove').mockResolvedValue(testArray[0]);
    expect(controller.remove("1")).resolves.toBe(testArray[0]);
  });
});