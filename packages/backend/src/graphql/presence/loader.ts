import DataLoader from 'dataloader';
import redis from '../../redis';
import { toPresence } from './utils';
import { Presence } from '@chattr/types';

export class PresenceLoader {
  private loader = new DataLoader(this.load);

  getById(id: string) {
    return this.loader.load(id);
  }

  getMany(ids: string[]) {
    return this.loader.loadMany(ids);
  }

  clearAll() {
    this.loader.clearAll();
  }

  private async load(ids: string[]): Promise<Presence[]> {
    const pipeline = redis.multi();

    ids.forEach(id => {
      pipeline.get(`users:${id}:presence`);
    });

    const result: [unknown, string][] = await pipeline.exec();
    return result.map(([, presence]) => toPresence(presence));
  }
}
