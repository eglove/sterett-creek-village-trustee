import { resolver } from 'blitz';
import db from 'db';

import { PaginateSchema } from '../../validations/validations';

export default resolver.pipe(
  resolver.zod(PaginateSchema),
  resolver.authorize(),
  async ({ take, skip }) => {
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
