import { resolver } from 'blitz';
import db from 'db';

import { PaginateSchema } from '../feature/dashboard/validations/validations';

export default resolver.pipe(
  resolver.zod(PaginateSchema),
  async ({ take, skip }) => {
    const count = db.homeImage.count();

    const homeImages = db.homeImage.findMany({
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

    const resolved = await Promise.all([count, homeImages]);

    return {
      count: resolved[0],
      homeImages: resolved[1],
    };
  }
);
