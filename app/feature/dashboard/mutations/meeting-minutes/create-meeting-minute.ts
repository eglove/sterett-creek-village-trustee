import { resolver } from 'blitz';
import db from 'db';

import { FileSchema } from '../../../../validations';

export default resolver.pipe(
  resolver.authorize(),
  resolver.zod(FileSchema),
  async data => {
    return db.file.create({
      data,
      select: {
        id: true,
      },
    });
  }
);
