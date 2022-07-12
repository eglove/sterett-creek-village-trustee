import { resolver } from 'blitz';
import db from 'db';

import { OptionalIdSchema } from '../../../../validations';

export default resolver.pipe(
  resolver.authorize(),
  resolver.zod(OptionalIdSchema),
  async ({ id }) => {
    if (typeof id === 'undefined') {
      return null;
    }

    return db.file.findUnique({
      select: {
        fileName: true,
        id: true,
      },
      where: {
        id,
      },
    });
  }
);
