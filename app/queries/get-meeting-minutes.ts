import { resolver } from 'blitz';
import db from 'db';

import { PaginateSchema } from '../validations';

export default resolver.pipe(
  resolver.zod(PaginateSchema),
  async ({ take, skip }) => {
    const count = db.file.count();

    const files = db.file.findMany({
      orderBy: {
        updatedAt: 'desc',
      },
      select: {
        fileName: true,
        id: true,
        url: true,
      },
      skip,
      take,
      where: {
        fileType: 'MEETING_MINUTES',
      },
    });

    const resolved = await Promise.all([count, files]);

    return {
      count: resolved[0],
      files: resolved[1],
    };
  }
);
