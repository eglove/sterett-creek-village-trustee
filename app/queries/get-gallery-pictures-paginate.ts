import { resolver } from 'blitz';
import db from 'db';

import { PaginateSchema } from '../validations';

export default resolver.pipe(
  resolver.zod(PaginateSchema),
  async ({ take, skip }) => {
    const count = db.homeImage.count();

    const galleryPictures = db.homeImage.findMany({
      orderBy: {
        updatedAt: 'desc',
      },
      select: {
        description: true,
        height: true,
        id: true,
        url: true,
        width: true,
      },
      skip,
      take,
    });

    const resolved = await Promise.all([count, galleryPictures]);

    return {
      count: resolved[0],
      galleryPictures: resolved[1],
    };
  }
);
