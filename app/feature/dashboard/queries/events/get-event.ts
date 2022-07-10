import { resolver } from 'blitz';
import db from 'db';

import { OptionalIdSchema } from '../../validations/validations';

export default resolver.pipe(
  resolver.zod(OptionalIdSchema),
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
