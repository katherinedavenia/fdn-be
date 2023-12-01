import { IsEmail, IsNotEmpty, IsString, IsUrl } from 'class-validator';
import { Transform } from 'class-transformer';

const capitalizeFirstLetter = (value: string): string => {
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
};

export class CreateUserDTO {
  @IsString()
  @IsEmail()
  @Transform(({ value }) => value.toLowerCase())
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => capitalizeFirstLetter(value))
  readonly firstName: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => capitalizeFirstLetter(value))
  readonly lastName: string;

  @IsString()
  @IsNotEmpty()
  @IsUrl()
  readonly avatar: string;
}
