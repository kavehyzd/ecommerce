import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  MinLength,
} from "class-validator";

export class CreateUserDto {
  @IsNotEmpty({ message: "نمیتواند خالی باشد" })
  @IsString({ message: "نام باید به صورت حروف باشد" })
  name: string;

  @IsString({ message: "موبایل باید وارد شود" })
  @Length(11, 11, { message: "موبایل باید 11 رقم باشد" })
  @IsNotEmpty({ message: "موبایل نمی تواند خالی باشد" })
  mobile: string;

  @IsString({ message: "رمز عبور باید رشته باشد" })
  @IsOptional()
  @MinLength(8, { message: "رمز عبور باید حداقل 8رقم باید" })
  password: string;
}
