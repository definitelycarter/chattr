import { QueryListArguments, RegisterUserInput } from '@chattr/types';
import * as bcrypt from 'bcrypt';
import { getRepository } from '../../utils/typeorm';
import { requireAuth } from '../auth';
import { updateUserPresence } from '../presence/helper';
import { makeQueryResponse, validateQueryOptions } from '../queries';
import { GraphQLContext } from '../types';
import User from './model';
import { findUsers } from './repository';
import { sign } from './utils';

export async function users(_: unknown, options: QueryListArguments<{ username?: string }>) {
  return validateQueryOptions(options)
    .then(findUsers)
    .then(q => q.getManyAndCount())
    .then(makeQueryResponse);
}

async function me(parent: unknown, args: unknown, context: GraphQLContext) {
  return context.users.getById(context.viewer.id);
}

export function user(parent: unknown, args: { id: string }, context: GraphQLContext) {
  return context.users.getById(args.id);
}

async function registerUser(_: unknown, item: RegisterUserInput) {
  if (!item.email) {
    throw new Error('The email is invalid');
  } else if (!item.username) {
    throw new Error('The username is invalid');
  } else if (!item.password) {
    throw new Error('The password is invalid');
  } else if (item.password !== item.password_confirm) {
    throw new Error('The passwords must match');
  }

  const users = getRepository(User);
  const user = users.create({
    email: item.email,
    username: item.username,
    password_hash: bcrypt.hashSync(item.password, 7),
  });

  const result = await users.insert(user);
  user.id = result.raw[0].id;

  await updateUserPresence(user.id!, 'online');

  const payload = {
    id: user.id,
    username: user.username,
  };

  const token = sign(payload);
  return { token };
}

async function loginUser(
  _: unknown,
  { username, password }: { username: string; password: string }
) {
  const users = getRepository(User);

  const user = await users.findOne({ where: { username: username } });
  if (!user) {
    throw new Error('The username / password is incorrect');
  }

  if (!bcrypt.compareSync(password, user.password_hash!)) {
    throw new Error('The username / password is incorrect');
  }

  await updateUserPresence(user.id!, 'online');

  const payload = {
    id: user.id,
    username: user.username,
  };

  const token = sign(payload);
  return { token };
}

export default {
  Viewer: {
    rooms(user: User, args: unknown, context: GraphQLContext) {
      if (!Array.isArray(user.room_ids) || !user.room_ids.length) return [];
      return context.rooms.getMany(user.room_ids);
    },
    presence(user: { id: string }, args: unknown, context: GraphQLContext) {
      return context.presence.getById(user.id);
    },
  },
  Query: {
    users: requireAuth(users),
    me: requireAuth(me),
  },
  User: {
    presence(user: User, args: unknown, context: GraphQLContext) {
      return context.presence.getById(user.id!);
    },
  },
  Member: {
    presence(user: User, args: unknown, context: GraphQLContext) {
      return context.presence.getById(user.id!);
    },
  },
  IUser: {
    __resolveType(item: unknown, args: unknown) {
      console.log(item);
      console.log(args);
    },
  },
  Mutation: {
    loginUser,
    registerUser,
  },
};
