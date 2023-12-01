import { IsEmail, IsOptional, IsString, IsUrl } from 'class-validator';
import { Transform } from 'class-transformer';

const capitalizeFirstLetter = (value: string): string => {
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
};

export class UpdateUserDTO {
  @IsString()
  @IsEmail()
  @Transform(({ value }) => value.toLowerCase())
  readonly email?: string;

  @IsString()
  @IsOptional()
  @Transform(({ value }) => capitalizeFirstLetter(value))
  readonly firstName?: string;

  @IsString()
  @IsOptional()
  @Transform(({ value }) => capitalizeFirstLetter(value))
  readonly lastName?: string;

  @IsString()
  @IsOptional()
  @IsUrl()
  readonly avatar?: string;
}
