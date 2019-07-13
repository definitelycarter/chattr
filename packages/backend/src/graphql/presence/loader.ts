import DataLoader from 'dataloader';
import { getPresenceFromUsers } from './repository';

export class PresenceLoader {
  private loader = new DataLoader(getPresenceFromUsers);

  getById(id: string) {
    return this.loader.load(id);
  }

  getMany(ids: string[]) {
    return this.loader.loadMany(ids);
  }

  clearAll() {
    this.loader.clearAll();
  }
}
