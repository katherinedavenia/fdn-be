import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Headers,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dtos/CreateUserDTO';
import { UpdateUserDTO } from './dtos/UpdateUserDTO';
import { config } from '~/config';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/fetch')
  async fetchAndStoreUsers(@Query('page') page: number) {
    if (!page || isNaN(page)) {
      throw new BadRequestException('please provide a valid page number');
    }

    const fetchedData = await this.userService.fetchAndStoreUsers(page);
    return fetchedData;
  }

  @Post('/')
  public async createUser(@Body() body: CreateUserDTO) {
    const user = await this.userService.createUser(body);
    return user;
  }

  @Put('/:userId')
  public async updateUser(
    @Param('userId') userId: number,
    @Body() body: UpdateUserDTO,
  ) {
    const user = await this.userService.updateUser(userId, body);
    return user;
  }

  @Get('/')
  public async getUsers() {
    const users = await this.userService.getUsers();
    return users;
  }

  @Get('/:userId')
  public async getUser(@Param('userId') userId: number) {
    const user = await this.userService.getUser(userId);
    return user;
  }

  @Delete('/:userId')
  public async deleteUser(
    @Param('userId') userId: number,
    @Headers('Authorization') authorization: string,
  ) {
    if (authorization !== config.authKey) {
      throw new BadRequestException('you are unauthorized to do this action');
    }

    await this.userService.deleteUser(userId);
  }
}
