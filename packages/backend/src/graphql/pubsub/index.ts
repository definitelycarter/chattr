import { RedisPubSub } from 'graphql-redis-subscriptions';
import Redis, { RedisOptions } from 'ioredis';

const options: RedisOptions = {
  host: process.env.REDIS_DOMAIN_NAME,
  port: 6379,
  retryStrategy: attempt => {
    return Math.max(attempt * 100, 3000);
  },
};

class PubSub extends RedisPubSub {
  constructor() {
    super({
      publisher: new Redis(options),
      subscriber: new Redis(options),
    });
  }
}

export default new PubSub();
