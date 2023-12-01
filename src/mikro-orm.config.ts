import { defineConfig } from '@mikro-orm/postgresql';
import { config } from './config';

export default defineConfig({
  host: config.postgresHost,
  port: config.postgresPort,
  user: config.postgresUser,
  password: config.postgresPassword,
  dbName: config.postgresDb,
  entities: ['./dist/**/*.entity.js', './dist/*.entity.js'],
  entitiesTs: ['./src/**/*.entity.ts', './src/*.entity.ts'],
  type: 'postgresql',
  migrations: {
    snapshot: false,
    path: 'dist/src/migrations',
    pathTs: 'src/migrations',
    disableForeignKeys: false,
  },
  debug: config.nodeEnv === 'development',
});
