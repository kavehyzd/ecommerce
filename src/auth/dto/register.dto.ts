import { IsString, Length, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString({ message: 'موبایل باید وارد شود' })
  @Length(11, 11, { message: 'موبایل باید 11 رقم باشد' })
  @IsNotEmpty({ message: 'موبایل نمی تواند خالی باشد' })
  mobile: string;

  @IsString({ message: 'رمز عبور باید رشته باشد' })
  @IsNotEmpty({ message: 'رمزعبور نمی تواند خالی باشد' })
  @MinLength(8, { message: 'رمز عبور باید حداقل 8رقم باید' })
  password: string;

  @IsNotEmpty({ message: 'نمیتواند خالی باشد' })
  @IsString({ message: 'نام باید به صورت حروف باشد' })
  name: string;
}
