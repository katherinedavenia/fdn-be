import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UserService } from './user.service';
import { Injectable } from '@nestjs/common';

export function IsEmailAlreadyExists(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'isEmailAlreadyExists',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsEmailAlreadyExistsConstraint,
    });
  };
}

@Injectable()
@ValidatorConstraint({ name: 'email', async: true })
export class IsEmailAlreadyExistsConstraint
  implements ValidatorConstraintInterface
{
  constructor(private readonly userService: UserService) {}
  async validate(email: string) {
    const user = await this.userService.findByEmail(email);
    return user ? false : true;
  }

  defaultMessage() {
    return 'this email already exists yaaa';
  }
}
