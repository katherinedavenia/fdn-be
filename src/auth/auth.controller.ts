import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/hello')
  public async getHello() {
    const hello = await this.authService.getHello();
    return hello;
  }
}
