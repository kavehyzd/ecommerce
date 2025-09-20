import { CreateUserDto } from "./create-user.dto";
import { IsNotEmpty, IsString } from "class-validator";

export class UpdateUserDto {
  @IsNotEmpty({ message: "نمیتواند خالی باشد" })
  @IsString({ message: "نام باید به صورت حروف باشد" })
  name: string;
}
