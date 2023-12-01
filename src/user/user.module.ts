import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    MikroOrmModule.forFeature({
      entities: [User],
    }),
    HttpModule,
  ],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
