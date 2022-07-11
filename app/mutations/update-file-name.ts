import { resolver } from 'blitz';
import db from 'db';

import { UpdateFileNameSchema } from '../validations';

export default resolver.pipe(
  resolver.authorize(),
  resolver.zod(UpdateFileNameSchema),
  async ({ id, fileName }) => {
    return db.file.update({
      data: {
        fileName,
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
