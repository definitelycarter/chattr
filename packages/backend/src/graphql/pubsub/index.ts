import { RedisPubSub } from 'graphql-redis-subscriptions';
import redis from '../../redis';

class PubSub extends RedisPubSub {
  constructor() {
    super({
      publisher: redis,
      subscriber: redis,
    });
  }
}

export default new PubSub();
