import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { UsersService } from "src/users/users.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async register(mobile: string, password: string, name: string) {
    const hashedpassword: string = await bcrypt.hash(password, 10);
    return this.usersService.create({
      name: name,
      mobile: mobile,
      password: hashedpassword,
    });
  }
  async login(mobile: string, password: string) {
    mobile = (mobile ?? '').trim();
    password = (password ?? '').trim();

    const user = await this.usersService.findOneByMobile(mobile);
    if (!user) throw new UnauthorizedException('کاربر با این شماره یافت نشد');

    // debug کوتاه (اگر لازم داری آزمایش کنی)
     console.log('DB hash:', user.password);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('رمز عبور اشتباه می باشد');
    }

    const payload = { mobile: user.mobile, sub: user.id, name: user.name };
    const token = this.jwtService.sign(payload);
    return { access_token: token };
  }
}
