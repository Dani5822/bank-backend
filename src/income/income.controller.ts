import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, NotFoundException, BadGatewayException, BadRequestException } from '@nestjs/common';
import { IncomeService } from './income.service';
import { CreateIncomeDto } from './dto/create-income.dto';
import { UpdateIncomeDto } from './dto/update-income.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('incomes')
@Controller('Income')
export class IncomeController {
  constructor(private readonly IncomeService: IncomeService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new income' })
  @UseGuards(AuthGuard)
  create(@Body() createIncomeDto: CreateIncomeDto) {
    try{
      return this.IncomeService.create(createIncomeDto);
    }catch{
      throw new BadRequestException('Bad Request');
    }
  }


  @Get(':id')
  @ApiOperation({ summary: 'Get an income by ID' })
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
  @ApiOperation({ summary: 'Update an income by ID' })
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() updateIncomeDto: UpdateIncomeDto) {
    return this.IncomeService.update(id, updateIncomeDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an income by ID' })
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.IncomeService.remove(id);
  }
}
