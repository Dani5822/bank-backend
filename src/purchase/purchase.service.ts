import { Injectable } from '@nestjs/common';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PurchaseService {
  db: PrismaService;
  constructor(db:PrismaService) {this.db=db};
  create(createPurchaseDto: CreatePurchaseDto) {
    return this.db.purchase.create({
      data: {
        total: createPurchaseDto.total,
        Product: createPurchaseDto.Product,
        Vendor: createPurchaseDto.Vendor,
        replicationammount: createPurchaseDto.replicationammount,
        replicationmetric: createPurchaseDto.replicationmetric,
        replicationstart: new Date(createPurchaseDto.replicationstart),
        replicationend: new Date(createPurchaseDto.replicationend),
        User: {
          connect: { id: createPurchaseDto.userid[0] }
        },
        Bankaccount: {
          connect: { id: createPurchaseDto.bankaccountid }
        }
      }
    });
  }

  findAll() {
    return `This action returns all purchase`;
  }

  findOne(id: number) {
    return `This action returns a #${id} purchase`;
  }

  update(id: number, updatePurchaseDto: UpdatePurchaseDto) {
    return `This action updates a #${id} purchase`;
  }

  remove(id: number) {
    return `This action removes a #${id} purchase`;
  }
}
