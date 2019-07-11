import DataLoader from 'dataloader';
import { getUsersByIds } from './repository';

export class UserLoader {
  private loader = new DataLoader(getUsersByIds);

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
