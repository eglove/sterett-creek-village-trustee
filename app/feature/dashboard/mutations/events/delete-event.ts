import { resolver } from 'blitz';
import db from 'db';

import { IdSchema } from '../../validations/validations';

export default resolver.pipe(
  resolver.authorize(),
  resolver.zod(IdSchema),
  async ({ id }) => {
    return db.event.delete({
      select: {
        id: true,
      },
      where: {
        id,
      },
    });
  }
);
