import { RedisPubSub } from 'graphql-redis-subscriptions';
import Redis from 'ioredis';

class PubSub extends RedisPubSub {
  constructor() {
    const options = {
      host: process.env.REDIS_DOMAIN_NAME,
      port: 6379,
      retry_strategy: (options: { attempt: number }) => {
        return Math.max(options.attempt * 100, 3000);
      },
    };

    super({
      publisher: new Redis(options),
      subscriber: new Redis(options),
    });
  }
}

export default new PubSub();
