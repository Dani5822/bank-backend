import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly AccountsService: AccountsService) {}

  @Post()
  create(@Body() createAccountDto: CreateAccountDto) {
    return this.AccountsService.create(createAccountDto);
  }

  @Get('all/:id')
  findAllbyUserId(@Param('id') id: string) {
    return this.AccountsService.findAllbyUserId(id);
  }

  @Get('allex/:id')
  getallexp(@Param('id') id: string) {
    return this.AccountsService.getAllExpensebyAccountID(id);
  }

  @Get('allin/:id')
  getallin(@Param('id') id: string) {
    return this.AccountsService.getAllIncomebyAccountID(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.AccountsService.findOne(id);
  }

  

  @Patch('/user/:id')
  async updateuser(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto) {
    return this.AccountsService.updateuser(id, updateAccountDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.AccountsService.remove(id);
  }
}
