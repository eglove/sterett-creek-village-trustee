import { resolver } from 'blitz';
import db from 'db';

import { EventValidations } from '../../validations/events/event-validations';

export default resolver.pipe(
  resolver.authorize(),
  resolver.zod(EventValidations),
  async ({ description, id, endsAt, startsAt, title }) => {
    if (typeof id === 'undefined') {
      return db.event.create({
        data: {
          description,
          endsAt,
          startsAt,
          title,
        },
        select: {
          id: true,
        },
      });
    }

    return db.event.update({
      data: {
        description,
        endsAt,
        startsAt,
        title,
      },
      select: { id: true },
      where: {
        id,
      },
    });
  }
);
