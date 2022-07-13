import { resolver } from 'blitz';
import db from 'db';

import { UpdateFileNameSchema } from '../validations';

export default resolver.pipe(
  resolver.authorize(),
  resolver.zod(UpdateFileNameSchema),
  async ({ id, fileName }) => {
    const file = await db.file.findUnique({
      select: { id: true },
      where: {
        fileName,
      },
    });

    if (file !== null) {
      throw new Error('File with that name already exists.');
    }

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
