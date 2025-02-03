import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtServce: JwtService,
  ) {}

  async authenticateUser(username: string, password: string) {
    const user = await this.validateUser(username, password);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    var access_token = await this.signIn(user.id, user.email, user.role);
    return {
      ...user,
      access_token,
    };
  }

  async validateUser(username: string, password: string) {
    const bcrypt = require('bcrypt');
    const user = await this.userService.loginwithtoken(username, password);
    if (await bcrypt.compare(password, user.password)) {
      var { password, ...x } = user;
      return x;
    } else {
      return null;
    }
  }

  async signIn(id: string, email: string, role: string) {
    const payload = { email, id, role };
    return this.jwtServce.sign(payload);
  }
}
