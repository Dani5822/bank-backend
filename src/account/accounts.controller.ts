import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly AccountsService: AccountsService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createAccountDto: CreateAccountDto) {
    return this.AccountsService.create(createAccountDto);
  }

  @Get('all/:id')
  @UseGuards(AuthGuard)
  findAllbyUserId(@Param('id') id: string) {
    return this.AccountsService.findAllbyUserId(id);
  }

  @Get('alluser/:id')
  @UseGuards(AuthGuard)
  findAllUserWithId(@Param('id') id: string) {
    return this.AccountsService.findAllUserWithId(id);
  }


  @Get('allex/:id')
  @UseGuards(AuthGuard)
  getallexp(@Param('id') id: string) {
    return this.AccountsService.getAllExpensebyAccountID(id);
  }

  @Get('allin/:id')
  @UseGuards(AuthGuard)
  getallin(@Param('id') id: string) {
    return this.AccountsService.getAllIncomebyAccountID(id);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string) {
    return this.AccountsService.findOne(id);
  }

  

  @Patch('/user/:id')
  @UseGuards(AuthGuard)
  async updateuser(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto) {
    return this.AccountsService.updateuser(id, updateAccountDto);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  async update(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto) {
    return this.AccountsService.update(id, updateAccountDto);
  }
  
  @Delete('/disconnect/:id')
  @UseGuards(AuthGuard)
  disconnectUser(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto) {
    return this.AccountsService.disconnectUser(id, updateAccountDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.AccountsService.remove(id);
  }
}
