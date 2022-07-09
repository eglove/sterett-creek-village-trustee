import { Event } from '@prisma/client';
import { useMutation, useQuery, useRouter } from 'blitz';
import { Dispatch, SetStateAction, useState } from 'react';

import deleteEvent from '../mutations/delete-event';
import getEvents from '../queries/get-events';
import { IdSchema } from '../validations';

type UseManageEventsReturn = {
  count: number;
  events: Array<
    Pick<Event, 'description' | 'endsAt' | 'id' | 'startsAt' | 'title'>
  >;
  handleDeleteEvent: (id: string) => Promise<void>;
  handleNavigateToUpsert: (id?: string) => Promise<void>;
  setSkip: Dispatch<SetStateAction<number>>;
  skip: number;
};

export const EVENTS_PAGE_SIZE = 5;

export const useManageEvents = (): UseManageEventsReturn => {
  const router = useRouter();

  const [skip, setSkip] = useState(0);

  const [data, { refetch }] = useQuery(getEvents, {
    skip,
    take: EVENTS_PAGE_SIZE,
  });

  const [deleteEventMutation] = useMutation(deleteEvent);

  const handleNavigateToUpsert = async (id?: string): Promise<void> => {
    if (typeof id === 'undefined') {
      await router.push('/dashboard/events/upsert');
    } else {
      await router.push(`/dashboard/events/upsert?id=${id}`);
    }
  };

  const handleDeleteEvent = async (id: string): Promise<void> => {
    const body = IdSchema.parse({ id });
    await deleteEventMutation(body);
    await refetch();
  };

  return {
    count: data.count,
    events: data.events,
    handleDeleteEvent,
    handleNavigateToUpsert,
    setSkip,
    skip,
  };
};
