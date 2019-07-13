import { getRepository } from '../../utils/typeorm';
import Message from './model';
import { OrderByCondition } from 'typeorm';

interface FindRoomMessagesOptions {
  room_id: string;
  skip?: number;
  take?: number;
  orderBy: OrderByCondition;
}
export function findRoomMessages({ room_id, skip, take, orderBy }: FindRoomMessagesOptions) {
  return getRepository(Message)
    .createQueryBuilder()
    .where({ room_id })
    .orderBy(orderBy)
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
