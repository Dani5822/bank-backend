import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import { ObjectId } from 'mongodb';

@Injectable()
export class UserService {
  db: PrismaService;
  constructor(db:PrismaService) {this.db=db};
  create(data: CreateUserDto) {
    return this.db.user.create({
      data: {
        Fristname: data.Fristname,
        Lastname: data.Lastname,
        email: data.email,
        password: data.password,
        Expense: undefined,
        Purchase: undefined,
        Accounts: undefined,
      },
    });
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
