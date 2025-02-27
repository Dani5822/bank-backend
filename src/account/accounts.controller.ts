import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, NotFoundException, HttpException } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('accounts')
@Controller('accounts')
export class AccountsController {
  constructor(private readonly AccountsService: AccountsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new account' })
  @UseGuards(AuthGuard)
  create(@Body() createAccountDto: CreateAccountDto) {
    return this.AccountsService.create(createAccountDto);
  }

  @Get('all/:id')
  @ApiOperation({ summary: 'Get all accounts by user ID' })
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
  @UseGuards(AuthGuard)
  async updateuser(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto) {
    return this.AccountsService.updateuser(id, updateAccountDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update account by ID' })
  @UseGuards(AuthGuard)
  async update(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto) {
    return this.AccountsService.update(id, updateAccountDto);
  }

  @Patch('/disconnect/:id')
  @ApiOperation({ summary: 'Disconnect user from account' })
  @UseGuards(AuthGuard)
  disconnectUser(@Param('id') id: string, @Body() data: { userId: string }) {
    return this.AccountsService.disconnectUser(id, data.userId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete account by ID' })
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.AccountsService.remove(id);
  }
}
