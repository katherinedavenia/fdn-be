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
@Index({ properties: ['phoneNumber'] })
export class User {
  [EntityRepositoryType]?: UserRepository;

  @PrimaryKey({
    autoincrement: true,
    type: BigIntType,
  })
  id: string;

  @Property()
  @Unique()
  email: string;

  @Property()
  @Unique()
  phoneNumber: string;

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

  constructor(email: string, phoneNumber: string) {
    this.email = email;
    this.phoneNumber = phoneNumber;
  }

  toJSON() {
    const o = wrap<User>(this).toObject();
    return o;
  }
}
