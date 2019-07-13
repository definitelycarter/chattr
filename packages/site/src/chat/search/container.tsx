import React, { useState, useRef, useEffect } from 'react';
import { QueryRoomsResult, QUERY_ROOMS } from './query';
import { useQuery } from '@apollo/react-hooks';
import { Search } from './search';

export function SearchContainer() {
  const [name, setName] = useState('');
  const [variables, setVariables] = useState<{ name: string }>();
  const timerRef = useRef<NodeJS.Timer>();

  const { loading, error, data } = useQuery<QueryRoomsResult>(QUERY_ROOMS, {
    fetchPolicy: 'network-only',
    variables: {
      ...variables,
      take: 30,
    },
  });

  useEffect(() => {
    timerRef.current = setTimeout(() => setVariables({ name }), 250);
    return () => clearTimeout(timerRef.current!);
  }, [name]);

  const items = data && data.rooms ? data.rooms.nodes : [];
  return <Search loading={loading} error={error} onChange={setName} query={name} items={items} />;
}
