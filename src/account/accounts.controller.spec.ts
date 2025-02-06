import { Test, TestingModule } from '@nestjs/testing';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';
import { PrismaService } from 'src/prisma.service';
import { AuthService } from 'src/auth/auth.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { NotFoundException } from '@nestjs/common';

describe('AccountsController', () => {
  let controller: AccountsController;
  let service: AccountsService;

  const testArray: any = [
    {
      id: '1',
      userId: ['2', '1'],
      total: 0.0,
      ownerName: 'Első Számla',
      Expenses: ['1', '2'],
      Incomes: ['1', '2'],
      createdAt: '2021-08-02T12:00:00.000Z',
      updatedAt: '2021-08-02T12:00:00.000Z',
      currency: 'HUF',
    },
    {
      id: '2',
      userId: ['3', '1'],
      total: 10.0,
      ownerName: 'Második Számla',
      Expenses: ['3'],
      Incomes: ['4'],
      createdAt: '2021-08-05T12:00:00.000Z',
      updatedAt: '2021-08-08T12:00:00.000Z',
      currency: 'USD',
    },
    {
      id: '3',
      userId: ['3'],
      total: 100.0,
      ownerName: 'Harmadik Számla',
      Expenses: [],
      Incomes: [],
      createdAt: '2021-08-23T12:00:00.000Z',
      updatedAt: '2021-08-30T12:00:00.000Z',
      currency: 'EUR',
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountsController],
      providers: [AccountsService, PrismaService,AuthService,AuthGuard,JwtService,UserService],
    }).compile();

    controller = module.get<AccountsController>(AccountsController);
    service = module.get<AccountsService>(AccountsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it("should find all",()=>{
    jest.spyOn(service,"findAllbyUserId").mockResolvedValue([testArray[0],testArray[1]]) //Ha Resolved value akkor
    expect(controller.findAllbyUserId("1")).resolves.toEqual([testArray[0],testArray[1]]) //kell ide a resolves és a toEqual
  })

  it("should find nothing",()=>{
    jest.spyOn(service,"findAllbyUserId").mockReturnValue(undefined)
    expect(controller.findAllbyUserId("7")).rejects.toThrow(NotFoundException)
  })

  it("should return account expenses",()=>{
    jest.spyOn(service,"getAllExpensebyAccountID").mockResolvedValue(testArray[0].Expenses)
    expect(controller.getallexp("1")).resolves.toEqual(testArray[0].Expenses)
  })

  it("should return Not found exception",()=>{
    jest.spyOn(service,"getAllExpensebyAccountID").mockResolvedValue(null)
    expect(controller.getallexp("1")).rejects.toThrow(NotFoundException)
  })

  it("should return account expenses",()=>{
    jest.spyOn(service,"getAllExpensebyAccountID").mockResolvedValue(testArray[0].Incomes)
    expect(controller.getallexp("1")).resolves.toEqual(testArray[0].Incomes)
  })

  it("should return Not found exception",()=>{
    jest.spyOn(service,"getAllExpensebyAccountID").mockResolvedValue(null)
    expect(controller.getallexp("1")).rejects.toThrow(NotFoundException)
  })
});
