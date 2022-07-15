import { resolver } from 'blitz';
import db from 'db';
import { z } from 'zod';

const GetFileSChema = z.object({
  fileType: z.enum(['COVENANTS', 'MEETING_MINUTES']),
  skip: z.number(),
  take: z.number(),
});

export default resolver.pipe(
  resolver.zod(GetFileSChema),
  async ({ take, skip, fileType }) => {
    const count = db.file.count({ where: { fileType } });

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
        fileType,
      },
    });

    const resolved = await Promise.all([count, files]);

    return {
      count: resolved[0],
      files: resolved[1],
    };
  }
);
