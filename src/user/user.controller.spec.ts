import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from '../prisma.service';
import { AuthService } from '../auth/auth.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { JwtService } from '@nestjs/jwt';
import { NotFoundException } from '@nestjs/common';
import { create } from 'domain';
import { CreateUserDto } from './dto/create-user.dto';
import exp from 'constants';


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


  it('should be defined', () => {
    expect(controller).toBeDefined();
  });


  it('should return one user where id matches', () => {   // mockResolvedValue
    jest.spyOn(service,"findOne").mockReturnValue(testArray[0])
    expect(controller.findOne("1")).toBe(testArray[0])
  });

  it('should be defined', () => {
    jest.spyOn(service,"findOne").mockReturnValue(undefined)
    expect(() => controller.findOne("1")).toThrow(NotFoundException);
  });

  it('should return with created user', () => {
    jest.spyOn(service,"create").mockReturnValue(testArray[0])
    expect(controller.create(testArray[0])).toEqual(testArray[0])
  })

  it("should return with the user with the updated user",()=>{
    jest.spyOn(service,"updatebank").mockReturnValue(testArray[0])
    expect(controller.updatebank("test",testArray[0])).toEqual(testArray[0])
  })


  it("sould return with a user",()=>{
    jest.spyOn(service,"findOnewithbankaccount").mockResolvedValue(testArray[0])
    expect(controller.findOnewithbankaccount(testArray[0])).resolves.toEqual(testArray[0])
  })

  it("sould return with a not found error",()=>{
    jest.spyOn(service,"findOnewithbankaccount").mockResolvedValue(null)
    expect(controller.findOnewithbankaccount(testArray[0])).rejects.toThrow(NotFoundException)
  })


  it("should return the user that was deleted", () =>{
    jest.spyOn(service,"remove").mockReturnValue(testArray[0])
    expect(controller.remove("id")).toEqual(testArray[0])
  })

  it("should return with the logged in user's data",()=>{
    jest.spyOn(service,"login").mockReturnValue(testArray[0])
    expect(controller.login("asd","asd")).toEqual(testArray[0])
  })
    


});
