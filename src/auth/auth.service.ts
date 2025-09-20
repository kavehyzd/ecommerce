import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bycrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async register(mobile: string, password: string, name: string) {
    const hashedpassword: string = await bycrypt.hash(password, 10);
    return this.usersService.create({
      name: name,
      mobile: mobile,
      password: hashedpassword,
    });
  }
  async login(mobile: string, password: string) {
    const user = await this.usersService.findOneByMobile(mobile);
    if (!(await bycrypt.compare(password, user?.password)))
      throw new UnauthorizedException('رمز عبور اشتباه می باشد ');
    const payload = { mobile: user?.mobile, sub: user?.id, name: user?.name };
  }
}
