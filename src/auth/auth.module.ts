import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { PrismaService } from 'src/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { env } from 'node:process';

@Module({
  providers: [AuthService,UserService,PrismaService,LocalStrategy],
  controllers: [AuthController],
  imports:[
    JwtModule.register({
      global:true,
      secret:process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    PassportModule
  ],
  exports:[AuthService]
})
export class AuthModule {}
