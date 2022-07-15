import { Image, Trustee } from '@prisma/client';
import { resolver } from 'blitz';
import db from 'db';

export type GetTrustee = Pick<
  Trustee,
  'duties' | 'firstName' | 'id' | 'lastName' | 'order' | 'phoneNumber'
> & {
  image: Pick<Image, 'description' | 'height' | 'width' | 'url'>;
};

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
