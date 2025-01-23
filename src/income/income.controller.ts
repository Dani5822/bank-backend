import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IncomeService } from './income.service';
import { CreateIncomeDto } from './dto/create-income.dto';
import { UpdateIncomeDto } from './dto/update-income.dto';

@Controller('Income')
export class IncomeController {
  constructor(private readonly IncomeService: IncomeService) {}

  @Post()
  create(@Body() createIncomeDto: CreateIncomeDto) {
    return this.IncomeService.create(createIncomeDto);
  }

  @Get()
  findAll() {
    return this.IncomeService.findAll();
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.IncomeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIncomeDto: UpdateIncomeDto) {
    return this.IncomeService.update(id, updateIncomeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.IncomeService.remove(id);
  }
}
