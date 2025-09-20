import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpStatus,
  Res,
  Put,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import type { Response } from "express";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    const createUser = await this.usersService.create(createUserDto);

    return res.status(HttpStatus.CREATED).json({
      statuscode: HttpStatus.CREATED,
      date: createUser,
      message: "کاربر ایجاد شد",
    });
  }

  @Get()
  async findAll(@Res() res: Response) {
    const users = await this.usersService.findAll();
    return res.status(HttpStatus.OK).json({
      statuscode: HttpStatus.OK,
      data: users,
      message: "لیست کاربران با موفقیت دریافت شد ",
    });
  }

  @Get(":id")
  async findOne(@Param("id") id: number, @Res() res: Response) {
    const user = await this.usersService.findOne(+id);
    return res.status(HttpStatus.OK).json({
      statuscode: HttpStatus.OK,
      data: user,
      message: "کاربر با موفقیت دریافت شد",
    });
  }

  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Res() res: Response,
  ) {
    const user = await this.usersService.update(+id, updateUserDto);
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      data: user,
      message: "کاربر با موفقیت آپدیت شد",
    });
  }

  @Delete(":id")
  async remove(@Param("id") id: number, @Res() res: Response) {
    await this.usersService.remove(+id);
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      data: null,
      message: "کاربر با موفقیت حذف شد",
    });
  }
}
