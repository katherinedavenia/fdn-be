import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, IsMobilePhone } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  @Transform(({ value }) => value.toLowerCase())
  @IsEmail()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @IsMobilePhone()
  @Transform((phoneNumber) => phoneNumber.value.replace('+', ''))
  readonly phoneNumber: string;
}
