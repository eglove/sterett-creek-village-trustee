import { resolver } from 'blitz';
import db from 'db';

export default resolver.pipe(async () => {
  return db.homeContent.findFirst({
    select: {
      content: true,
      id: true,
      image: {
        select: {
          accessKey: true,
          description: true,
          height: true,
          url: true,
          width: true,
        },
      },
    },
  });
});
