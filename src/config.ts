import { get } from 'env-var';
import { loadEnv } from './env';

loadEnv();

export const getRequired = (env: string) => get(env).required();

export const config = {
  get appEnv() {
    return getRequired('APP_ENV').asString();
  },
  get nodeEnv() {
    return getRequired('NODE_ENV').asString();
  },
  get postgresHost() {
    return getRequired('POSTGRES_HOST').asString();
  },
  get postgresPort() {
    return getRequired('POSTGRES_PORT').asPortNumber();
  },
  get postgresUser() {
    return getRequired('POSTGRES_USER').asString();
  },
  get postgresPassword() {
    return getRequired('POSTGRES_PASSWORD').asString();
  },
  get postgresDb() {
    const postgresDB = getRequired('POSTGRES_DB').asString();
    return postgresDB;
  },
};
