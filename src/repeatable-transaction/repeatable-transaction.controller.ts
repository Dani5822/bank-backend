import { Controller, Get, Post, Body, Patch, Param,UseGuards, Delete } from '@nestjs/common';
import { RepeatableTransactionService } from './repeatable-transaction.service';
import { CreateRepeatableTransactionDto } from './dto/create-repeatable-transaction.dto';
import { UpdateRepeatableTransactionDto } from './dto/update-repeatable-transaction.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('repeatabletransactions')
@Controller('repeatabletransaction')
export class RepeatableTransactionController {
  constructor(private readonly repeatableTransactionService: RepeatableTransactionService,) {}

  @Post()
  @ApiOperation({ summary: 'Create a new repeatable transaction' })
  @UseGuards(AuthGuard)
  async create(@Body() createRepeatableTransactionDto: CreateRepeatableTransactionDto) {
    return await this.repeatableTransactionService.create(createRepeatableTransactionDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a repeatable transaction by ID' })
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string) {
    return this.repeatableTransactionService.findOne(id);
  }

  @Patch('update/:id')
  @ApiOperation({ summary: 'Update a repeatable transaction by user ID' })
  @UseGuards(AuthGuard)
  async updateTransaction(@Param('id') id: string,@Body() Data: {userId:string}) {
    return await this.repeatableTransactionService.updateTransaction(id, Data.userId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a repeatable transaction by ID' })
  @UseGuards(AuthGuard)
  async update(@Param('id') id: string, @Body() updateRepeatableTransactionDto: UpdateRepeatableTransactionDto) {
    return await this.repeatableTransactionService.update(id, updateRepeatableTransactionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a repeatable transaction by ID' })
  @UseGuards(AuthGuard)
  async remove(@Param('id') id: string) {
    return await this.repeatableTransactionService.remove(id);
  }
}
