import { Presence } from '@chattr/types';
import { useEffect, useRef, useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

type PresenceInput = 'online' | 'away';

export function usePresence(presence: PresenceInput) {
  const [updatePresence] = useMutation(SET_PRESENCE);

  useEffect(() => {
    async function mutatePresence(presence: Presence) {
      await updatePresence({
        variables: {
          presence,
        },
      });
    }
    mutatePresence(presence);
  }, [presence]);
}

const SET_PRESENCE = gql`
  mutation UpdatePresence($presence: UpdatePresence!) {
    updatePresence(presence: $presence)
  }
`;
