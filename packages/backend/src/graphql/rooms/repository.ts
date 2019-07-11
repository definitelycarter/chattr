import { QueryListArguments } from '@chattr/types';
import { getRepository } from '../../utils/typeorm';
import { getUserById } from '../users/repository';
import Room from './model';
import User from '../users/model';

export function findRooms({ skip, take, filter = {} }: QueryListArguments<{ name?: string }>) {
  let builder = getRepository(Room).createQueryBuilder();

  if (filter.name) {
    builder = builder.where('LOWER(name) LIKE LOWER(:name)', {
      name: `%${filter.name}%`,
    });
  }

  return builder.skip(skip).take(take);
}

export function getRoomById(id: string) {
  return getRepository(Room)
    .createQueryBuilder()
    .where({ id })
    .getOne();
}

export function getRoomsByIds(ids: string[]) {
  return getRepository(Room)
    .createQueryBuilder()
    .whereInIds(ids)
    .getMany();
}

/**
 * finds the rooms the given user is a member of and
 * builds a distinct list of members of those rooms.
 */
export async function getMembersInUserRoom(user_id: string): Promise<string[]> {
  const user = await getUserById(user_id);
  if (!user) return [];
  const { room_ids = [] } = user!;
  if (!room_ids.length) return [];

  const items = await getRoomsByIds(room_ids);

  const allMemberIds = items.reduce<string[]>((arr, { member_ids = [] }) => {
    return arr.concat(...member_ids);
  }, []);

  const userIdMap = new Set(allMemberIds);
  return Array.from(userIdMap.keys());
}
/**
 * Adds the user as a member of a room.
 * @param user_id The user requesting to join a room.
 * @param room_id The room to join.
 */
export async function addRoomMember(user_id: string, room_id: string) {
  const rooms = getRepository(Room);
  const room = await rooms.findOneOrFail(room_id, {
    relations: ['members'],
  });

  const { member_ids = [] } = room;
  if (!member_ids.includes(user_id)) {
    room.members!.push(new User(user_id));
    return await rooms.save(room);
  }

  return room;
}
/**
 * Removes user from a room.
 * @param user_id The user requesting to join a room.
 * @param room_id The room to join.
 */
export async function removeRoomMember(user_id: string, room_id: string) {
  const rooms = getRepository(Room);
  const room = await rooms.findOneOrFail(room_id, {
    relations: ['members'],
  });

  const { member_ids = [] } = room;
  if (member_ids.includes(user_id)) {
    const new_members = room.members!.filter(m => m.id !== user_id);
    room.members = new_members;
    return await rooms.save(room);
  }

  return room;
}

interface CreateRoomOptions {
  name: string;
  topic: string;
  user_id: string;
}
/**
 * Creates a room using the provided name and
 * associates ownership the user an owner of that room.
 */
export async function createRoom({ name, topic, user_id }: CreateRoomOptions) {
  const rooms = getRepository(Room);

  // 1. create the room
  const room = rooms.create({
    name,
    topic,
    owner: new User(user_id),
  });
  const result = await rooms.insert(room);
  const id: string = result.raw[0].id;

  return id;
}

export async function updateRoom({ id, room }: { id: string; room: Partial<Room> }) {
  await getRepository(Room)
    .createQueryBuilder()
    .where('id = :id', { id })
    .update(room)
    .execute();
}
