import { Test, TestingModule } from '@nestjs/testing';
import { IncomeService } from './income.service';
import { PrismaService } from 'src/prisma.service';

describe('IncomeService', () => {
  let service: IncomeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IncomeService,PrismaService],
    }).compile();

    service = module.get<IncomeService>(IncomeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
