import { QueryListArguments } from '@chattr/types';
import { ValidationError } from 'apollo-server-core';
import { requireAuth } from '../auth';
import { findRoomMessages } from '../messages/repository';
import { updatePresence } from '../middleware';
import pubSub from '../pubsub';
import { makeQueryResponse, validateQueryOptions } from '../queries';
import { GraphQLContext } from '../types';
import Room from './model';
import {
  addRoomMember,
  createRoom,
  findRooms,
  getRoomById,
  removeRoomMember,
  updateRoom,
} from './repository';
import { shouldNotify } from './utils';

const ROOM_EVENT = 'ROOM_EVENT';

export async function rooms(_: unknown, options: QueryListArguments<{ name?: string }>) {
  return validateQueryOptions(options)
    .then(findRooms)
    .then(q => q.getManyAndCount())
    .then(makeQueryResponse);
}

export function room(_: unknown, { id }: { id: string }, context: GraphQLContext) {
  return context.rooms.getById(id);
}

async function joinRoom(_: unknown, { id }: { id: string }, context: GraphQLContext) {
  const { member_ids = [] } = await addRoomMember(context.viewer.id, id);

  const payload: RoomEventNotification = {
    roomEvent: {
      type: 'user_joined',
      room_id: id,
      user_id: context.viewer.id,
      member_ids,
    },
  };

  pubSub.publish(ROOM_EVENT, payload);
  return true;
}

async function leaveRoom(_: unknown, { id }: { id: string }, context: GraphQLContext) {
  const { member_ids = [] } = await removeRoomMember(context.viewer.id, id);

  const payload: RoomEventNotification = {
    roomEvent: {
      type: 'user_left',
      room_id: id,
      user_id: context.viewer.id,
      member_ids,
    },
  };
  pubSub.publish(ROOM_EVENT, payload);
  return true;
}

async function _createRoom(
  _: unknown,
  args: { name: string; topic: string },
  context: GraphQLContext
) {
  const room_id = await createRoom({
    ...args,
    user_id: context.viewer.id,
  });

  await addRoomMember(context.viewer.id, room_id);

  return room_id;
}

async function updateRoomTopic(
  _: unknown,
  args: { id: string; topic?: string },
  context: GraphQLContext
) {
  const room = await getRoomById(args.id);

  if (!room) {
    throw new ValidationError('Room does not exist');
  }

  if (room.owner_id !== context.viewer.id) {
    throw new ValidationError('You must be the owner of a room to change a topic');
  }

  await updateRoom({
    id: args.id,
    room: {
      topic: args.topic,
    },
  });

  return true;
}

async function setTypingInRoom(_: unknown, args: { id: string }, context: GraphQLContext) {
  const room = await context.rooms.getById(args.id);
  const { member_ids = [] } = room;

  if (!member_ids.includes(context.viewer.id)) {
    return false;
  }

  const payload: RoomEventNotification = {
    roomEvent: {
      type: 'user_typing',
      room_id: room.id,
      user_id: context.viewer.id,
      member_ids,
    },
  };

  pubSub.publish(ROOM_EVENT, payload);

  return true;
}

async function* roomEvent(x1: unknown, x2: unknown, context: GraphQLContext) {
  // @ts-ignore
  const iter: AsyncIterable<RoomEventNotification> = pubSub.asyncIterator<RoomEventNotification>(
    ROOM_EVENT
  );
  for await (const item of iter) {
    if (shouldNotify(context.viewer.id, item.roomEvent)) {
      context.users.clearAll();
      context.rooms.clearAll();
      yield item;
    }
  }
}

export default {
  Query: {
    rooms: requireAuth(rooms),
    room: requireAuth(room),
  },
  Mutation: {
    createRoom: requireAuth(_createRoom),
    joinRoom: requireAuth(joinRoom),
    leaveRoom: requireAuth(leaveRoom),
    updateRoomTopic: requireAuth(updateRoomTopic),
    userTypingInRoom: requireAuth(updatePresence(setTypingInRoom)),
  },
  Subscription: {
    roomEvent: {
      subscribe: roomEvent,
    },
  },
  Room: {
    async recent_messages(room: Room) {
      const messages = await findRoomMessages({
        room_id: room.id,
        orderBy: {
          sent_at: 'DESC',
        },
        take: 30,
      });
      return messages.reverse();
    },
    owner({ owner_id }: Room, _: unknown, context: GraphQLContext) {
      return context.users.getById(owner_id!);
    },
    member_count({ member_ids = [] }: Room) {
      return member_ids.length;
    },
    members(
      { admin_ids = [], member_ids = [], owner_id }: Room,
      _: unknown,
      context: GraphQLContext
    ) {
      if (!Array.isArray(member_ids) || !member_ids.length) return [];
      return context.users!.getMany(member_ids).then(users => {
        return users.map(user => {
          return {
            ...user,
            is_admin: owner_id === user.id || admin_ids.includes(user.id!),
          };
        });
      });
    },
  },
  RoomEvent: {
    member({ user_id }: { user_id: string }, args: unknown, context: GraphQLContext) {
      return context.users.getById(user_id);
    },
    room({ room_id }: { room_id: string }, args: unknown, context: GraphQLContext) {
      return context.rooms.getById(room_id);
    },
  },
};

type RoomChanged = {
  type: RoomEventType;
  user_id: string;
  room_id: string;
  member_ids: string[];
};

type RoomEventNotification = {
  roomEvent: RoomChanged;
};

type RoomEventType = 'user_typing' | 'user_joined' | 'user_left';
