import { resolver } from 'blitz';
import db from 'db';

import { GetEventSchema } from '../validations';

export default resolver.pipe(
  resolver.zod(GetEventSchema),
  resolver.authorize(),
  async ({ id }) => {
    if (typeof id === 'undefined') {
      return null;
    }

    return db.event.findUnique({
      select: {
        description: true,
        endsAt: true,
        id: true,
        startsAt: true,
        title: true,
      },
      where: {
        id,
      },
    });
  }
);
