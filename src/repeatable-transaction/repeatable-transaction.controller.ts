import { Controller, Get, Post, Body, Patch, Param, UseGuards, Delete } from '@nestjs/common';
import { RepeatableTransactionService } from './repeatable-transaction.service';
import { CreateRepeatableTransactionDto } from './dto/create-repeatable-transaction.dto';
import { UpdateRepeatableTransactionDto } from './dto/update-repeatable-transaction.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { ApiTags, ApiOperation, ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger';
import {ApiBearerAuth} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Repeatable Transaction')
@Controller('repeatabletransaction')
export class RepeatableTransactionController {
  constructor(private readonly repeatableTransactionService: RepeatableTransactionService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new repeatable transaction' })
  @ApiBody({ type: CreateRepeatableTransactionDto })
  @ApiResponse({ status: 201, description: 'The repeatable transaction has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @UseGuards(AuthGuard)
  async create(@Body() createRepeatableTransactionDto: CreateRepeatableTransactionDto) {
    let transaction= await this.repeatableTransactionService.create(createRepeatableTransactionDto);
    console.log(transaction)
    return transaction;
  }

  @Get('expense/:id')
  @ApiOperation({ summary: 'Get a repeatable transaction by ID with Expenses' })
  @ApiParam({ name: 'id', required: true, description: 'Repeatable Transaction ID' })
  @ApiResponse({ status: 200, description: 'The repeatable transaction has been successfully retrieved.' })
  @ApiResponse({ status: 404, description: 'Not Found.' })
  @UseGuards(AuthGuard)
  findOneWithExpenses(@Param('id') id: string) {
    return this.repeatableTransactionService.findOneWithExpenses(id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a repeatable transaction by ID' })
  @ApiParam({ name: 'id', required: true, description: 'Repeatable Transaction ID' })
  @ApiResponse({ status: 200, description: 'The repeatable transaction has been successfully retrieved.' })
  @ApiResponse({ status: 404, description: 'Not Found.' })
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string) {
    return this.repeatableTransactionService.findOne(id);
  }


  @Patch('update/:id')
  @ApiOperation({ summary: 'Update a repeatable transaction by account ID' })
  @ApiParam({ name: 'id', required: true, description: 'Repeatable Transaction ID' })
  @ApiBody({ schema: { properties: { userId: { type: 'string' } } } })
  @ApiResponse({ status: 200, description: 'The repeatable transaction has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Not Found.' })
  @UseGuards(AuthGuard)
  async updateTransaction(@Param('id') accountId: string, @Body() Data: { userId: string }) {
    return await this.repeatableTransactionService.updateTransaction(accountId, Data.userId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a repeatable transaction by ID' })
  @ApiParam({ name: 'id', required: true, description: 'Repeatable Transaction ID' })
  @ApiBody({ type: UpdateRepeatableTransactionDto })
  @ApiResponse({ status: 200, description: 'The repeatable transaction has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Not Found.' })
  @UseGuards(AuthGuard)
  async update(@Param('id') id: string, @Body() updateRepeatableTransactionDto: UpdateRepeatableTransactionDto) {
    return await this.repeatableTransactionService.update(id, updateRepeatableTransactionDto);
  }

  @Delete('stop/:id')
  @ApiOperation({ summary: 'Stop a repeatable transaction by ID' })
  @ApiParam({ name: 'id', required: true, description: 'Repeatable Transaction ID' })
  @ApiResponse({ status: 200, description: 'The repeatable transaction has been successfully Stoped.' })
  @ApiResponse({ status: 404, description: 'Not Found.' })
  @UseGuards(AuthGuard)
  async stoprepetable(@Param('id') id: string) {
    return await this.repeatableTransactionService.stoprepetable(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a repeatable transaction by ID' })
  @ApiParam({ name: 'id', required: true, description: 'Repeatable Transaction ID' })
  @ApiResponse({ status: 200, description: 'The repeatable transaction has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Not Found.' })
  @UseGuards(AuthGuard)
  async remove(@Param('id') id: string) {
    return await this.repeatableTransactionService.remove(id);
  }
}
