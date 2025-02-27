import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthService } from '../auth/auth.service';
import { PassportLocalGuard } from '../auth/guards/passport.local.guard';
import { AuthGuard } from '../auth/guards/auth.guard';
import { ApiTags,ApiOperation } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService,private authService:AuthService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a user by ID' })
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string) {
    const user = this.userService.findOne(id);
    if (user == null) {
      throw new NotFoundException('Not Found');
    } else {
      return user;
    }
  }
  @Post('login/token')
  @ApiOperation({ summary: 'Login and get token' })
  login(@Body('email') email: string, @Body('password') password: string) {
    return this.userService.login(email, password);
  }


  
  @Get('userbank/:id')
  @ApiOperation({ summary: 'Get user with bank account by ID' })
  @UseGuards(AuthGuard)
  async findOnewithbankaccount(@Param('id') id: string) {
    let x= await this.userService.findOnewithbankaccount(id);
    if(x == null)
    {
      throw new NotFoundException('Not Found')
    }
    else
    {
      return x;
    }
    
  }
  
  @Patch('userbank/:id')
  @ApiOperation({ summary: 'Update user bank account by ID' })
  @UseGuards(AuthGuard)
  updatebank(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updatebank(id, updateUserDto);
  }
  
  @Patch(':id')
  @ApiOperation({ summary: 'Update user by ID' })
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }
  
  @Delete(':id')
  @ApiOperation({ summary: 'Delete user by ID' })
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }


  @Post('login')
  @ApiOperation({ summary: 'Login with token' })
  @UseGuards(PassportLocalGuard)
  loginwithtoken(@Body('email') email: string, @Body('password') password: string){
    return this.authService.authenticateUser(email,password)
  }

}
