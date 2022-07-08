import { Ctx, resolver } from 'blitz';
import db from 'db';

import { CreateEventSchema } from '../validations';

export default resolver.pipe(
  resolver.zod(CreateEventSchema),
  async ({ description, endsAt, startsAt, title }, ctx: Ctx) => {
    ctx.session.$authorize();

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
);
