import {
  Entity,
  EntityRepositoryType,
  PrimaryKey,
  Property,
  wrap,
  Index,
  BigIntType,
  Unique,
} from '@mikro-orm/core';
import { UserRepository } from './user.repository';

@Entity({ customRepository: () => UserRepository, tableName: 'users' })
@Index({ properties: ['email'] })
export class User {
  [EntityRepositoryType]?: UserRepository;

  @PrimaryKey({
    autoincrement: true,
    type: BigIntType,
  })
  id: number;

  @Property()
  @Unique()
  email: string;

  @Property()
  firstName: string;

  @Property()
  lastName: string;

  @Property()
  avatar: string;

  @Property({
    type: 'timestamp with time zone',
    hidden: true,
  })
  createdAt: Date = new Date();

  @Property({
    onUpdate: () => new Date(),
    type: 'timestamp with time zone',
    hidden: true,
  })
  updatedAt: Date = new Date();

  @Property({
    type: 'timestamp with time zone',
    hidden: true,
    nullable: true,
  })
  deletedAt: Date | null = null;

  constructor(
    email: string,
    firstName: string,
    lastName: string,
    avatar: string,
  ) {
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.avatar = avatar;
  }

  toJSON() {
    const o = wrap<User>(this).toObject();
    return o;
  }
}
