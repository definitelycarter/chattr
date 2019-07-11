import { Presence } from '@chattr/types';
import { useEffect, useRef, useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

type PresenceInput = 'online' | 'away';

export function usePresence(presence: PresenceInput) {
  const timeoutRef = useRef<NodeJS.Timeout>();
  const [updatePresence] = useMutation(SET_PRESENCE);
  const [currentPresence, setPresence] = useState<Presence>('offline');

  useEffect(() => {
    setPresence(presence);
    mutatePresence(presence).finally(() => {
      timeoutRef.current = setInterval(() => mutatePresence(presence), 1000 * 30);
    });

    async function mutatePresence(presence: Presence) {
      await updatePresence({
        variables: {
          presence,
        },
      });
    }

    return () => clearInterval(timeoutRef.current!);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [presence]);

  return currentPresence;
}

const SET_PRESENCE = gql`
  mutation UpdatePresence($presence: UpdatePresence!) {
    updatePresence(presence: $presence)
  }
`;
