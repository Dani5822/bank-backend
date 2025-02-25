import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RepeatableTransactionService } from './repeatable-transaction.service';
import { CreateRepeatableTransactionDto } from './dto/create-repeatable-transaction.dto';
import { UpdateRepeatableTransactionDto } from './dto/update-repeatable-transaction.dto';

@Controller('repeatabletransaction')
export class RepeatableTransactionController {
  constructor(private readonly repeatableTransactionService: RepeatableTransactionService) {}

  @Post()
  async create(@Body() createRepeatableTransactionDto: CreateRepeatableTransactionDto) {
    return await this.repeatableTransactionService.create(createRepeatableTransactionDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.repeatableTransactionService.findOne(id);
  }

  @Patch('update/:id')
  async updateTransaction(@Param('id') id: string,@Body() Data: {userId:string}) {
    return await this.repeatableTransactionService.updateTransaction(id, Data.userId);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateRepeatableTransactionDto: UpdateRepeatableTransactionDto) {
    return await this.repeatableTransactionService.update(id, updateRepeatableTransactionDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.repeatableTransactionService.remove(id);
  }
}
