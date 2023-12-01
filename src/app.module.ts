import {
  MiddlewareConsumer,
  Module,
  NestModule,
  OnModuleInit,
} from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MikroOrmMiddleware, MikroOrmModule } from '@mikro-orm/nestjs';
import defineConfig from './mikro-orm.config';
import { MikroORM } from '@mikro-orm/core';

@Module({
  imports: [MikroOrmModule.forRoot(defineConfig), AuthModule],
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
