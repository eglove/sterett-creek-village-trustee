import { resolver } from 'blitz';
import db from 'db';

export default resolver.pipe(async () => {
  return db.trustee.findMany({
    orderBy: {
      order: 'asc',
    },
    select: {
      duties: true,
      firstName: true,
      id: true,
      image: {
        select: {
          description: true,
          height: true,
          url: true,
          width: true,
        },
      },
      lastName: true,
      order: true,
      phoneNumber: true,
    },
  });
});
