import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, NotFoundException, BadRequestException } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('expenses')
@Controller('expense')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new expense' })
  @UseGuards(AuthGuard)
  create(@Body() createExpenseDto: CreateExpenseDto) {
    try{
      return this.expenseService.create(createExpenseDto);
    }catch{
      throw new BadRequestException('Bad Request');
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an expense by ID' })
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string) {
        const income = this.expenseService.findOne(id);
        if (income == undefined) {
          throw new NotFoundException('Not Found this income');
        } else {
          return this.expenseService.findOne(id);
        }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an expense by ID' })
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() updateExpenseDto: UpdateExpenseDto) {
    return this.expenseService.update(id, updateExpenseDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an expense by ID' })
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.expenseService.remove(id);
  }
}
