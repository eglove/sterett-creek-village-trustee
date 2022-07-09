import { resolver } from 'blitz';
import db from 'db';

import { PaginateSchema } from '../feature/dashboard/validations';

export default resolver.pipe(
  resolver.zod(PaginateSchema),
  async ({ take, skip }) => {
    const count = db.covenant.count();

    const covenants = db.covenant.findMany({
      orderBy: {
        updatedAt: 'desc',
      },
      select: {
        id: true,
        title: true,
        url: true,
      },
      skip,
      take,
    });

    const resolved = await Promise.all([count, covenants]);

    return {
      count: resolved[0],
      covenants: resolved[1],
    };
  }
);
