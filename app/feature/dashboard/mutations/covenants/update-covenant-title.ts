import { resolver } from 'blitz';
import db from 'db';

import { UpdateCovenantTitleSchema } from '../../validations/covenants/covenant-validations';

export default resolver.pipe(
  resolver.authorize(),
  resolver.zod(UpdateCovenantTitleSchema),
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
