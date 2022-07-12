import { resolver } from 'blitz';
import db from 'db';

export default resolver.pipe(async () => {
  return db.trustee.findMany({
    orderBy: {
      order: 'desc',
    },
    select: {
      duties: true,
      firstName: true,
      image: {
        select: {
          description: true,
          height: true,
          url: true,
          width: true,
        },
      },
      lastName: true,
      phoneNumber: true,
    },
  });
});
