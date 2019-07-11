import { UserLoader } from './users';
import { RoomLoader } from './rooms';
import { PresenceLoader } from './presence';

export type GraphQLContext = {
  viewer: {
    id: string;
    username: string;
  };

  rooms: RoomLoader;
  users: UserLoader;
  presence: PresenceLoader;
};
