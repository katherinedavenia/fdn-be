import {
  MiddlewareConsumer,
  Module,
  NestModule,
  OnModuleInit,
} from '@nestjs/common';
import { MikroOrmMiddleware, MikroOrmModule } from '@mikro-orm/nestjs';
import defineConfig from './mikro-orm.config';
import { MikroORM } from '@mikro-orm/core';
import { UserModule } from './user/user.module';
import { HttpModule } from '@nestjs/axios';
import { HttpExceptionFilter } from './http-exception.filter';

@Module({
  imports: [MikroOrmModule.forRoot(defineConfig), UserModule, HttpModule],
  providers: [HttpExceptionFilter],
})
export class AppModule implements NestModule, OnModuleInit {
  constructor(private readonly orm: MikroORM) {}

  async onModuleInit(): Promise<void> {
    await this.orm.getMigrator().up();
  }

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MikroOrmMiddleware).forRoutes('*');
  }
}
