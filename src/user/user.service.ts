import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor() {}

  public async getHello(): Promise<string> {
    return 'Hello World';
  }
}
