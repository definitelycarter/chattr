import { getRepository } from '../../utils/typeorm';
import Message from './model';

interface FindRoomMessagesOptions {
  room_id: string;
  skip?: number;
  take?: number;
}
export function findRoomMessages({ room_id, skip, take }: FindRoomMessagesOptions) {
  return getRepository(Message)
    .createQueryBuilder()
    .where({ room_id })
    .skip(skip)
    .take(take)
    .getMany();
}

export function findMessages({ skip, take }: { skip?: number; take?: number }) {
  return getRepository(Message)
    .createQueryBuilder()
    .skip(skip)
    .take(take)
    .getManyAndCount();
}
