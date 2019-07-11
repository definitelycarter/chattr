import { QueryListArguments } from '@chattr/types';
import { getRepository } from '../../utils/typeorm';
import { requireAuth } from '../auth';
import { updatePresence } from '../middleware';
import pubSub from '../pubsub';
import { makeQueryResponse, validateQueryOptions } from '../queries';
import Room from '../rooms/model';
import { GraphQLContext } from '../types';
import { User } from '../users';
import Message from './model';
import { findMessages } from './repository';

const ROOM_MESSAGE_POSTED = 'ROOM_MESSAGE_POSTED';

export async function messages(_: unknown, options: QueryListArguments<unknown>) {
  return validateQueryOptions(options)
    .then(findMessages)
    .then(makeQueryResponse);
}

async function postRoomMessage(
  _: unknown,
  args: { id: number; content: string },
  context: GraphQLContext
) {
  const room = await getRepository(Room).findOneOrFail({
    where: {
      id: args.id,
    },
  });

  const { member_ids = [] } = room;
  if (!member_ids.includes(context.viewer.id)) {
    throw new Error('You are not a member of this room');
  }

  const messages = getRepository(Message);

  const message = messages.create({
    author: new User(context.viewer.id),
    sent_at: new Date(),
    content: args.content,
    room,
  });

  const result = await messages.save(message, { reload: true });

  pubSub.publish(ROOM_MESSAGE_POSTED, {
    roomMessagePosted: result,
    member_ids,
  });
  return message;
}

async function* roomMessagePosted(_: unknown, args: unknown, context: GraphQLContext) {
  // @ts-ignore
  const iter: AsyncIterable<RoomMessagePostedNotification> = pubSub.asyncIterator(
    ROOM_MESSAGE_POSTED
  );

  for await (const item of iter) {
    const { member_ids } = item;
    if (member_ids.includes(context.viewer.id)) {
      context.users.clearAll();
      context.rooms.clearAll();
      yield item;
    }
  }
}

export default {
  Message: {
    room(message: Message, _: unknown, context: GraphQLContext) {
      return context.rooms!.getById(message.room_id!);
    },
    author(message: Message, _: unknown, context: GraphQLContext) {
      return context.users!.getById(message.author_id!);
    },
  },
  Query: {
    messages: requireAuth(messages),
  },
  Subscription: {
    roomMessagePosted: {
      subscribe: roomMessagePosted,
    },
  },
  Mutation: {
    postRoomMessage: requireAuth(updatePresence(postRoomMessage)),
  },
};

type RoomMessagePostedNotification = {
  roomMessagePosted: Message;
  member_ids: string[];
};
