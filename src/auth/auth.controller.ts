import { Body, Controller, HttpStatus, Post, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import type { Response } from "express";

@Controller("auth")
export class AuthController {
  constructor(private autthService: AuthService) {}

  @Post("register")
  async register(@Body() RegisterDto: RegisterDto) {
    return this.autthService.register(
      RegisterDto.mobile,
      RegisterDto.password,
      RegisterDto.name,
    );
  }

  @Post("login")
  async login(@Body() LoginDto: LoginDto, @Res() res: Response) {
    const login = await this.autthService.login(
      LoginDto.mobile,
      LoginDto.password,
    );
    res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      data: login,
      message: "با موفقیت وارد شدید",
    });
  }
}
