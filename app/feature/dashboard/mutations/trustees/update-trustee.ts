import { Ctx, resolver } from 'blitz';
import db from 'db';

import deleteCloudinaryImage from '../../../../mutations/delete-cloudinary-image';
import { UpdateTrusteeSchema } from '../../validations/trustees/trustee-validations';

export default resolver.pipe(
  resolver.authorize(),
  resolver.zod(UpdateTrusteeSchema),
  async (
    {
      id,
      description,
      duties,
      firstName,
      lastName,
      phoneNumber,
      url,
      height,
      width,
      cloudinaryId,
    },
    ctx: Ctx
  ) => {
    const toDelete = await db.trustee.findUnique({
      select: {
        image: {
          select: {
            cloudinaryId: true,
          },
        },
      },
      where: {
        id,
      },
    });

    if (toDelete === null) {
      throw new Error('Trustee not found.');
    }

    const trustee = await db.trustee.update({
      data: {
        duties,
        firstName,
        image: {
          update: {
            cloudinaryId,
            description,
            height,
            url,
            width,
          },
        },
        lastName,
        phoneNumber,
      },
      select: {
        id: true,
      },
      where: {
        id,
      },
    });

    await deleteCloudinaryImage({ id: toDelete.image.cloudinaryId }, ctx);

    return trustee;
  }
);
