import { resolver } from 'blitz';
import db from 'db';

import { UpdateCovenantTitle } from '../validations';

export default resolver.pipe(
  resolver.authorize(),
  resolver.zod(UpdateCovenantTitle),
  async ({ id, title }) => {
    return db.covenant.update({
      data: {
        title,
      },
      select: {
        id: true,
      },
      where: {
        id,
      },
    });
  }
);
