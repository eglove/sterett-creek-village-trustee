import { Ctx, resolver } from 'blitz';
import db from 'db';

import deleteCloudinaryImage from '../../../../mutations/delete-cloudinary-image';
import { IdSchema } from '../../../../validations';

export default resolver.pipe(
  resolver.authorize(),
  resolver.zod(IdSchema),
  async ({ id }, ctx: Ctx) => {
    const galleryPicture = await db.homeImage.delete({
      select: {
        cloudinaryId: true,
        id: true,
      },
      where: {
        id,
      },
    });

    await deleteCloudinaryImage(
      {
        id: galleryPicture.id,
      },
      ctx
    );

    return { id: galleryPicture.id };
  }
);
