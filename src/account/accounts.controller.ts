import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, NotFoundException, HttpException } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { ApiTags, ApiOperation, ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger';
import {ApiBearerAuth} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Account')
@Controller('accounts')
export class AccountsController {
  constructor(private readonly AccountsService: AccountsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new account' })
  @ApiBody({ type: CreateAccountDto })
  @ApiResponse({ status: 201, description: 'The account has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @UseGuards(AuthGuard)
  create(@Body() createAccountDto: CreateAccountDto) {
    return this.AccountsService.create(createAccountDto);
  }

  @Get('all/:id')
  @ApiOperation({ summary: 'Get all accounts by user ID' })
  @ApiParam({ name: 'id', required: true, description: 'User ID' })
  @ApiResponse({ status: 200, description: 'The accounts have been successfully retrieved.' })
  @ApiResponse({ status: 404, description: 'Not Found.' })
  @UseGuards(AuthGuard)
  async findAllbyUserId(@Param('id') id: string) {
    const data = await this.AccountsService.findAllbyUserId(id);
    if (data == null) {
      throw new NotFoundException('Not Found');
    } else {
      return data;
    }
  }

  @Get('alluser/:id')
  @ApiOperation({ summary: 'Get all users with ID' })
  @ApiParam({ name: 'id', required: true, description: 'User ID' })
  @ApiResponse({ status: 200, description: 'The users have been successfully retrieved.' })
  @ApiResponse({ status: 404, description: 'Not Found.' })
  @UseGuards(AuthGuard)
  async findAllUserWithId(@Param('id') id: string) {
    const data = await this.AccountsService.findAllUserWithId(id);
    if (data == null) {
      throw new NotFoundException('Not Found');
    }
    return data;
  }

  @Get('user/:id')
  @ApiOperation({ summary: 'Get all accounts with user' })
  @ApiParam({ name: 'id', required: true, description: 'User ID' })
  @ApiResponse({ status: 200, description: 'The accounts have been successfully retrieved.' })
  @ApiResponse({ status: 404, description: 'Not Found.' })
  @UseGuards(AuthGuard)
  async findAllWithUser(@Param('id') id: string) {
    const data = await this.AccountsService.findAllWithUser(id);
    if (data == null) {
      throw new NotFoundException('Not Found');
    }
    return data;
  }

  @Get('allex/:id')
  @ApiOperation({ summary: 'Get all expenses by account ID' })
  @ApiParam({ name: 'id', required: true, description: 'Account ID' })
  @ApiResponse({ status: 200, description: 'The expenses have been successfully retrieved.' })
  @ApiResponse({ status: 404, description: 'Not Found.' })
  @UseGuards(AuthGuard)
  async getallexp(@Param('id') id: string) {
    let data = null;
    try {
      data = await this.AccountsService.getAllExpensebyAccountID(id);
    } catch (error) {
      return new HttpException('Not Found', 404);
    }
    if (data == null) {
      return new HttpException('Not Found', 404);
    }
    return data;
  }

  @Get('allin/:id')
  @ApiOperation({ summary: 'Get all incomes by account ID' })
  @ApiParam({ name: 'id', required: true, description: 'Account ID' })
  @ApiResponse({ status: 200, description: 'The incomes have been successfully retrieved.' })
  @ApiResponse({ status: 404, description: 'Not Found.' })
  @UseGuards(AuthGuard)
  async getallin(@Param('id') id: string) {
    const data = await this.AccountsService.getAllIncomebyAccountID(id);
    if (data == null) {
      return new HttpException('Not Found', 404);
    }
    return data;
  }

  @Get('onlyUsers/:id')
  @ApiOperation({ summary: 'Get only users by ID' })
  @ApiParam({ name: 'id', required: true, description: 'User ID' })
  @ApiResponse({ status: 200, description: 'The users have been successfully retrieved.' })
  @ApiResponse({ status: 404, description: 'Not Found.' })
  @UseGuards(AuthGuard)
  async getOnlyUser(@Param('id') id: string) {
    const data = await this.AccountsService.getOnlyUser(id);
    if (data == null) {
      throw new NotFoundException('Not Found');
    }
    return data.Users;
  }

  @Patch('/transfer')
  @ApiOperation({ summary: 'Transfer amount between accounts' })
  @ApiBody({ schema: { properties: { userId: { type: 'string' }, accountfrom: { type: 'string' }, accountto: { type: 'string' }, amount: { type: 'number' } } } })
  @ApiResponse({ status: 200, description: 'The transfer has been successfully completed.' })
  @ApiResponse({ status: 404, description: 'Not Found.' })
  @UseGuards(AuthGuard)
  transfer(@Body() transferdata: { userId: string; accountfrom: string; accountto: string; amount: number }) {
    try {
      const data = this.AccountsService.transfer(transferdata);
      if (data == null) {
        throw new Error('Not enough balance');
      }
      return data;
    } catch (e) {
      throw new NotFoundException(e.message);
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get account by ID' })
  @ApiParam({ name: 'id', required: true, description: 'Account ID' })
  @ApiResponse({ status: 200, description: 'The account has been successfully retrieved.' })
  @ApiResponse({ status: 404, description: 'Not Found.' })
  @UseGuards(AuthGuard)
  async findOne(@Param('id') id: string) {
    const data = await this.AccountsService.findOne(id);
    if (data == null) {
      throw new NotFoundException('Not Found');
    }
    return data;
  }

  @Patch('/user/email/:id')
  @ApiOperation({ summary: 'Connect user with email' })
  @ApiParam({ name: 'id', required: true, description: 'Account ID' })
  @ApiBody({ schema: { properties: { email: { type: 'string' } } } })
  @ApiResponse({ status: 200, description: 'The user has been successfully connected with email.' })
  @ApiResponse({ status: 404, description: 'Not Found.' })
  @UseGuards(AuthGuard)
  async connectUserwithemail(@Param('id') id: string, @Body() body: { email: string }) {
    const data = await this.AccountsService.connectUserwithemail(id, body.email);
    if (data == null) {
      throw new NotFoundException('Not Found');
    }
    return data;
  }

  @Patch('/user/:id')
  @ApiOperation({ summary: 'Update user by ID' })
  @ApiParam({ name: 'id', required: true, description: 'User ID' })
  @ApiBody({ type: UpdateAccountDto })
  @ApiResponse({ status: 200, description: 'The user has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Not Found.' })
  @UseGuards(AuthGuard)
  async updateuser(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto) {
    return this.AccountsService.updateuser(id, updateAccountDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update account by ID' })
  @ApiParam({ name: 'id', required: true, description: 'Account ID' })
  @ApiBody({ type: UpdateAccountDto })
  @ApiResponse({ status: 200, description: 'The account has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Not Found.' })
  @UseGuards(AuthGuard)
  async update(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto) {
    return this.AccountsService.update(id, updateAccountDto);
  }

  @Patch('/disconnect/:id')
  @ApiOperation({ summary: 'Disconnect user from account' })
  @ApiParam({ name: 'id', required: true, description: 'Account ID' })
  @ApiBody({ schema: { properties: { userId: { type: 'string' } } } })
  @ApiResponse({ status: 200, description: 'The user has been successfully disconnected from the account.' })
  @ApiResponse({ status: 404, description: 'Not Found.' })
  @UseGuards(AuthGuard)
  disconnectUser(@Param('id') id: string, @Body() data: { userId: string }) {
    return this.AccountsService.disconnectUser(id, data.userId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete account by ID' })
  @ApiParam({ name: 'id', required: true, description: 'Account ID' })
  @ApiResponse({ status: 200, description: 'The account has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Not Found.' })
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.AccountsService.remove(id);
  }
}
