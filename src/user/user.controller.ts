import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/hello')
  public async getHello() {
    const hello = await this.userService.getHello();
    return hello;
  }
}
