import { IsString, Length, IsNotEmpty, MinLength } from "class-validator";

export class LoginDto {
  @IsString({ message: "موبایل باید وارد شود" })
  @Length(11, 11, { message: "موبایل باید 11 رقم باشد" })
  @IsNotEmpty({ message: "موبایل نمی تواند خالی باشد" })
  mobile: string;

  @IsString({ message: "رمز عبور باید رشته باشد" })
  @IsNotEmpty({ message: "رمزعبور نمی تواند خالی باشد" })
  password: string;
}
