import { Event } from '@prisma/client';
import { resolver } from 'blitz';
import db from 'db';

import { GetEventsPaginateSchema } from '../validations';

interface GetEventsProperties {
  skip: number;
  take: number;
}

export type GetEventsReturn = {
  count: number;
  events: Array<
    Pick<Event, 'description' | 'endsAt' | 'id' | 'startsAt' | 'title'>
  >;
};

export default resolver.pipe(
  resolver.zod(GetEventsPaginateSchema),
  resolver.authorize(),
  async ({ take, skip }: GetEventsProperties): Promise<GetEventsReturn> => {
    const count = db.event.count();

    const events = db.event.findMany({
      orderBy: {
        startsAt: 'desc',
      },
      select: {
        description: true,
        endsAt: true,
        id: true,
        startsAt: true,
        title: true,
      },
      skip,
      take,
    });

    const resolved = await Promise.all([count, events]);

    return {
      count: resolved[0],
      events: resolved[1],
    };
  }
);
