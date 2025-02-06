import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, NotFoundException, BadGatewayException, BadRequestException } from '@nestjs/common';
import { IncomeService } from './income.service';
import { CreateIncomeDto } from './dto/create-income.dto';
import { UpdateIncomeDto } from './dto/update-income.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('Income')
export class IncomeController {
  constructor(private readonly IncomeService: IncomeService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createIncomeDto: CreateIncomeDto) {
    return this.IncomeService.create(createIncomeDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.IncomeService.findAll();
  }


  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string) {
    const income = this.IncomeService.findOne(+id);
    if (income == undefined) {
      throw new NotFoundException('Not Found this income');
    } else {
      return this.IncomeService.findOne(+id);
    }
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() updateIncomeDto: UpdateIncomeDto) {
    return this.IncomeService.update(id, updateIncomeDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.IncomeService.remove(id);
  }
}
