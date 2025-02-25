import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, NotFoundException, BadRequestException } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('expense')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createExpenseDto: CreateExpenseDto) {
    try{
      return this.expenseService.create(createExpenseDto);
    }catch{
      throw new BadRequestException('Bad Request');
    }
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.expenseService.findAll();
  }

  @Get(':id')
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
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() updateExpenseDto: UpdateExpenseDto) {
    return this.expenseService.update(id, updateExpenseDto);
  }

  @Delete(':id')
  //@UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.expenseService.remove(id);
  }
}
