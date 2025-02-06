import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, NotFoundException } from '@nestjs/common';
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
  async findAllbyUserId(@Param('id') id: string) {
    const data=await this.AccountsService.findAllbyUserId(id);
    if(data==null){
      throw new NotFoundException('Not Found');
    }else{
      return data;
    }
  }

  @Get('alluser/:id')
  @UseGuards(AuthGuard)
  async findAllUserWithId(@Param('id') id: string) {
    const data=await this.AccountsService.findAllUserWithId(id);
    if(data==null){
      throw new NotFoundException('Not Found');}
    return data;
  }


  @Get('allex/:id')
  @UseGuards(AuthGuard)
  async getallexp(@Param('id') id: string) {
    const data= await this.AccountsService.getAllExpensebyAccountID(id);
    if(data==null){
      throw new NotFoundException('Not Found');
    }
    return data;
  }

  @Get('allin/:id')
  @UseGuards(AuthGuard)
  async getallin(@Param('id') id: string) {
    const data=await this.AccountsService.getAllIncomebyAccountID(id);
    if(data==null){
      throw new NotFoundException('Not Found');
    }
    return data;
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
