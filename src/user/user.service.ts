import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDTO } from './dtos/CreateUserDTO';
import { User } from './user.entity';
import { UpdateUserDTO } from './dtos/UpdateUserDTO';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly httpService: HttpService,
  ) {}

  async fetchAndStoreUsers(page: number): Promise<User[]> {
    const externalURL = `https://reqres.in/api/users?page=${page}`;
    const response = await this.httpService.get(externalURL).toPromise();

    const users = response?.data?.data;

    const storedUsers = [];
    for (const user of users) {
      const emailExists = await this.userRepo.count({ email: user.email });
      if (!emailExists) {
        const newUser = new User(
          user.email,
          user.first_name,
          user.last_name,
          user.avatar,
        );

        storedUsers.push(newUser);
      }
    }

    await this.userRepo.persistAndFlush(storedUsers);

    return storedUsers;
  }

  public async createUser(createUserDTO: CreateUserDTO): Promise<User> {
    const { email, firstName, lastName, avatar } = createUserDTO;

    // const emailExists = await this.userRepo.count({ email, deletedAt: null });
    // if (emailExists) {
    //   throw new UnprocessableEntityException('this email already exists');
    // }

    const user = new User(email, firstName, lastName, avatar);

    await this.userRepo.persistAndFlush(user);

    return user;
  }

  public async updateUser(
    userId: number,
    updateUserDTO: UpdateUserDTO,
  ): Promise<User> {
    const { email, firstName, lastName, avatar } = updateUserDTO;

    if (!email && !firstName && !lastName && !avatar) {
      throw new UnprocessableEntityException(
        'please provide at least one field to update',
      );
    }

    const existingUser = await this.userRepo.findOne({
      id: userId,
      deletedAt: null,
    });
    if (!existingUser) {
      throw new NotFoundException('user not found');
    }

    if (email) {
      if (email === existingUser.email) {
        throw new UnprocessableEntityException('please provide a new email');
      }

      const emailExists = await this.userRepo.count({ email, deletedAt: null });
      if (emailExists) {
        throw new UnprocessableEntityException(
          'this email has already been used',
        );
      }

      existingUser.email = email;
    }

    if (firstName) {
      existingUser.firstName = firstName;
    }

    if (lastName) {
      existingUser.lastName = lastName;
    }

    if (avatar) {
      existingUser.avatar = avatar;
    }

    await this.userRepo.persistAndFlush(existingUser);

    return existingUser;
  }

  public async getUsers(): Promise<User[]> {
    const users = await this.userRepo.find({ deletedAt: null });

    return users;
  }

  public async getUser(userId: number): Promise<User> {
    const user = await this.userRepo.findOne({ id: userId, deletedAt: null });
    if (!user) {
      throw new NotFoundException('user not found');
    }

    return user;
  }

  public async deleteUser(userId: number): Promise<void> {
    const user = await this.userRepo.findOne({ id: userId, deletedAt: null });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.deletedAt = new Date();

    await this.userRepo.flush();
  }

  public async findByEmail(email: string): Promise<User | null> {
    console.log('service layer:', email);
    const user = this.userRepo.findOne({ email, deletedAt: null });
    console.log(user);
    if (!user) {
      throw new NotFoundException('user not found');
    }

    return user;
  }
}
