import { Event } from '@prisma/client';
import { useQuery } from 'blitz';
import { Dispatch, SetStateAction, useState } from 'react';

import getEvents from '../queries/get-events';

type UseManageEventsReturn = {
  count: number;
  events: Array<
    Pick<Event, 'description' | 'endsAt' | 'id' | 'startsAt' | 'title'>
  >;
  setSkip: Dispatch<SetStateAction<number>>;
  skip: number;
};

export const PAGE_SIZE = 5;

export const useManageEvents = (): UseManageEventsReturn => {
  const [skip, setSkip] = useState(0);

  const [{ events, count }] = useQuery(getEvents, {
    skip,
    take: PAGE_SIZE,
  });

  return {
    count,
    events,
    setSkip,
    skip,
  };
};
