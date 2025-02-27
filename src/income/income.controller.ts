import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, NotFoundException, BadRequestException } from '@nestjs/common';
import { IncomeService } from './income.service';
import { CreateIncomeDto } from './dto/create-income.dto';
import { UpdateIncomeDto } from './dto/update-income.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { ApiTags, ApiOperation, ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger';
import {ApiBearerAuth} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Income')
@Controller('Income')
export class IncomeController {
  constructor(private readonly IncomeService: IncomeService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new income' })
  @ApiBody({ type: CreateIncomeDto })
  @ApiResponse({ status: 201, description: 'The income has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @UseGuards(AuthGuard)
  create(@Body() createIncomeDto: CreateIncomeDto) {
    try {
      return this.IncomeService.create(createIncomeDto);
    } catch {
      throw new BadRequestException('Bad Request');
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an income by ID' })
  @ApiParam({ name: 'id', required: true, description: 'Income ID' })
  @ApiResponse({ status: 200, description: 'The income has been successfully retrieved.' })
  @ApiResponse({ status: 404, description: 'Not Found.' })
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
  @ApiParam({ name: 'id', required: true, description: 'Income ID' })
  @ApiBody({ type: UpdateIncomeDto })
  @ApiResponse({ status: 200, description: 'The income has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Not Found.' })
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() updateIncomeDto: UpdateIncomeDto) {
    return this.IncomeService.update(id, updateIncomeDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an income by ID' })
  @ApiParam({ name: 'id', required: true, description: 'Income ID' })
  @ApiResponse({ status: 200, description: 'The income has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Not Found.' })
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.IncomeService.remove(id);
  }
}
