import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dtos/CreateUserDTO';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/')
  public async createUser(@Body() body: CreateUserDTO) {
    const user = await this.userService.createUser(body);
    return user;
  }

  @Get('/:userId')
  public async getUser(@Param('userId') userId: string) {
    const user = await this.userService.getUser(userId);
    return user;
  }
}
