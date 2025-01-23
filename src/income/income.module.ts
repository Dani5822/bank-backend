import { Module } from '@nestjs/common';
import { PurchaseService } from './income.service';
import { PurchaseController } from './income.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [PurchaseController],
  providers: [PurchaseService,PrismaService],
})
export class PurchaseModule {}
