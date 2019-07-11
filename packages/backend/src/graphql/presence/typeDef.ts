import gql from 'graphql-tag';

export default gql`
  enum Presence {
    online
    offline
    away
  }

  enum UpdatePresence {
    online
    away
  }

  type UserPresenceChanged {
    user_id: ID!
    presence: Presence!
  }

  extend type Subscription {
    userPresenceChanged: UserPresenceChanged!
  }

  extend type Mutation {
    """
    Updates the presence of the logged in user.
    """
    updatePresence(presence: UpdatePresence!): Boolean
    """
    Sends a ping to the server. It is required that you send a ping at least once every 1 minute.
    If a ping is not sent within 1 minute, the user is assumed to be offline.
    """
    ping: Boolean
  }
`;
