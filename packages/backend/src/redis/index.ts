import Redis, { RedisOptions } from 'ioredis';

const options: RedisOptions = {
  host: process.env.REDIS_DOMAIN_NAME,
  port: 6379,
  retryStrategy: attempt => {
    return Math.max(attempt * 100, 3000);
  },
};

export default new Redis(options);
