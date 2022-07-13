import { allDigitsInString } from '@ethang/utilities';
import { resolver } from 'blitz';
import db from 'db';

import { CreateTrusteeSchema } from '../../validations/trustees/trustee-validations';

export default resolver.pipe(
  resolver.authorize(),
  resolver.zod(CreateTrusteeSchema),
  async ({
    description,
    height,
    url,
    width,
    cloudinaryId,
    firstName,
    lastName,
    phoneNumber,
    duties,
  }) => {
    const lastTrustee = await db.trustee.findFirst({
      orderBy: {
        order: 'desc',
      },
      select: {
        order: true,
      },
    });

    return db.trustee.create({
      data: {
        duties,
        firstName,
        image: {
          create: {
            cloudinaryId,
            description,
            height,
            url,
            width,
          },
        },
        lastName,
        order: lastTrustee === null ? 0 : lastTrustee.order + 1,
        phoneNumber: allDigitsInString(phoneNumber) ?? '',
      },
      select: {
        id: true,
      },
    });
  }
);
