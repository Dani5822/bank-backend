import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from '../prisma.service';
import { AuthService } from '../auth/auth.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { JwtService } from '@nestjs/jwt';
import { NotFoundException } from '@nestjs/common';


describe('UserController', () => {
  let controller: UserController;
  let service: UserService;



  const testArray : any = [
    {
      id: "1",
      firstName: "string",
      lastName: "string",
      role: "Admin",
      email: "string",
      password: "string",
      expenseId: ["string","asd"],
      incomeId: ["asd","sd"],
      createdAt: new Date,
      updatedAt: new Date,
      accountId: ["asd","asd"],
    },
    {
      id: "2",
      firstName: "string",
      lastName: "string",
      role: "Admin",
      email: "stringasd",
      password: "string",
      expenseId: ["string","asd"],
      incomeId: ["asd","sd"],
      createdAt:  new Date,
      updatedAt: new Date,
      accountId: ["asd","asd"],
    }
  ]

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService,PrismaService,AuthService,AuthGuard,JwtService], //need to provide all dependencies, need to use Absolute Paths for evey import everywhere
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);

  });

  it('should return a list of all users', () => {
    jest.spyOn(service,"findAll").mockReturnValue(testArray)
      expect(controller.findAll()).toEqual(testArray)
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });


  it('should return one user where id matches', () => {   // mockResolvedValue
    jest.spyOn(service,"findOne").mockReturnValue(testArray[0])
    expect(controller.findOne("1")).toBe(testArray[0])
  });

  it('should be defined', () => {
    jest.spyOn(service,"findOne").mockReturnValue(null)
    expect(() => controller.findOne("1")).toThrow(NotFoundException);
  })

  it('should return the user and all of its bankaccounts', () => {
    jest.spyOn(service,"findOnewithbankaccount").mockResolvedValue(testArray[0])
    expect(controller.findOnewithbankaccount("1")).resolves.toEqual(testArray[0])
  })
});
