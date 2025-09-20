import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";

@Controller("auth")
export class AuthController {
  constructor(private autthService: AuthService) {}

  @Post("register")
  async register(@Body() RegisterDto: RegisterDto) {
    return this.autthService.register(
      RegisterDto.mobile,
      RegisterDto.name,
      RegisterDto.password,
    );
  }

  @Post("login")
  async login(@Body() LoginDto: LoginDto) {

    return this.autthService.login(LoginDto.mobile, LoginDto.password);
  }
}
