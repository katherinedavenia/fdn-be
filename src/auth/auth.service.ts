import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor() {}

  public async getHello(): Promise<string> {
    return 'Hello World';
  }
}
