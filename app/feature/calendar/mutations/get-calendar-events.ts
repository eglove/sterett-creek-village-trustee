import { resolver } from 'blitz';
import db from 'db';

import { GetEventsSchema } from '../../dashboard/validations/events/event-validations';

export default resolver.pipe(
  resolver.zod(GetEventsSchema),
  async ({ from, to }) => {
    return db.event.findMany({
      select: {
        description: true,
        endsAt: true,
        id: true,
        startsAt: true,
        title: true,
      },
      where: {
        endsAt: {
          lte: to,
        },
        startsAt: {
          gte: from,
        },
      },
    });
  }
);
