import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useEffect, useRef } from 'react';
import ms from 'ms';

const duration = ms('10 sec');

export function usePing() {
  const timeoutRef = useRef<NodeJS.Timeout>();
  const [pingMutation] = useMutation(PING_MUTATION);

  useEffect(() => {
    pingMutation().finally(() => {
      timeoutRef.current = setInterval(() => pingMutation(), duration);
    });
    return () => clearInterval(timeoutRef.current!);
    // TODO i am getting a new mutation each time
    // ts-lint-disable-line react-hooks/exhaustive-deps
  }, []);
}

const PING_MUTATION = gql`
  mutation {
    ping
  }
`;
