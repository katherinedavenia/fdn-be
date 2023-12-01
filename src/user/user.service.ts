import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDTO } from './dtos/CreateUserDTO';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository) {}

  public async createUser(createUserDTO: CreateUserDTO): Promise<User> {
    const { email, phoneNumber } = createUserDTO;

    const emailExists = await this.userRepo.count({ email });
    if (emailExists) {
      throw new UnprocessableEntityException('this email already exists');
    }

    const phoneNumberExists = await this.userRepo.count({ phoneNumber });
    if (phoneNumberExists) {
      throw new UnprocessableEntityException(
        'this phone number already exists',
      );
    }

    const user = new User(email, phoneNumber);

    await this.userRepo.persistAndFlush(user);

    return user;
  }

  public async getUser(userId: string): Promise<User> {
    const user = await this.userRepo.findOne({ id: userId });
    if (!user) {
      throw new NotFoundException('user not found');
    }

    return user;
  }
}
