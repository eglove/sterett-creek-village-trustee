import { Ctx, resolver } from 'blitz';
import db from 'db';

import { IdSchema } from '../validations';
import deleteS3File from './delete-s3-file';

export default resolver.pipe(
  resolver.authorize(),
  resolver.zod(IdSchema),
  async ({ id }, ctx: Ctx) => {
    const file = await db.file.delete({
      select: {
        id: true,
        key: true,
      },
      where: {
        id,
      },
    });

    await deleteS3File({ id: file.key }, ctx);

    return file;
  }
);
