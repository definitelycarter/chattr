import DataLoader from 'dataloader';
import { getRoomsByIds } from './repository';

export class RoomLoader {
  private loader = new DataLoader(getRoomsByIds);

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
