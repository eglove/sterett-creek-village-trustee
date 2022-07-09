import { Ctx, resolver } from 'blitz';
import db from 'db';

import { UpsertEventSchema } from '../validations';

export default resolver.pipe(
  resolver.zod(UpsertEventSchema),
  async ({ description, id, endsAt, startsAt, title }, ctx: Ctx) => {
    ctx.session.$authorize();

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