import { resolver } from 'blitz';
import db from 'db';

import { FileSchema } from '../validations';

export default resolver.pipe(
  resolver.authorize(),
  resolver.zod(FileSchema),
  async data => {
    const file = await db.file.findUnique({
      select: { id: true },
      where: {
        fileName: data.fileName,
      },
    });

    if (file !== null) {
      throw new Error('File with that name already exists.');
    }

    return db.file.create({
      data,
      select: {
        id: true,
      },
    });
  }
);
