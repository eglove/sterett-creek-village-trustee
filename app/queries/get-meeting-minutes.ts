import { resolver } from 'blitz';
import db from 'db';

import { PaginateSchema } from '../validations';

export default resolver.pipe(
  resolver.zod(PaginateSchema),
  async ({ take, skip }) => {
    const count = db.meetingMinute.count();

    const meetingMinutes = db.meetingMinute.findMany({
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

    const resolved = await Promise.all([count, meetingMinutes]);

    return {
      count: resolved[0],
      meetingMinutes: resolved[1],
    };
  }
);
