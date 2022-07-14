import { Ctx, resolver } from 'blitz';
import db from 'db';

import deleteCloudinaryImage from '../../../../mutations/delete-cloudinary-image';
import { UpdateHomeSchema } from '../../validations/home/home-validations';

export default resolver.pipe(
  resolver.authorize(),
  resolver.zod(UpdateHomeSchema),
  async (
    { missionStatement, url, height, width, description, cloudinaryId },
    ctx: Ctx
  ) => {
    const homeContent = await db.homeContent.findFirst({
      select: {
        id: true,
        image: { select: { cloudinaryId: true } },
        imageId: true,
      },
    });

    // Delete previous file if new one is given
    if (homeContent !== null && typeof cloudinaryId !== 'undefined') {
      await deleteCloudinaryImage({ id: homeContent.image.cloudinaryId }, ctx);
    }

    try {
      if (
        homeContent === null &&
        typeof missionStatement !== 'undefined' &&
        typeof cloudinaryId !== 'undefined' &&
        typeof description !== 'undefined' &&
        typeof height !== 'undefined' &&
        typeof url !== 'undefined' &&
        typeof width !== 'undefined'
      ) {
        return await db.homeContent.create({
          data: {
            content: missionStatement,
            image: {
              create: { cloudinaryId, description, height, url, width },
            },
          },
          select: { id: true },
        });
      }

      return await db.homeContent.update({
        data: {
          content: missionStatement,
          image: {
            update: { cloudinaryId, description, height, url, width },
          },
        },
        select: { id: true },
        where: { id: homeContent?.id },
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        await deleteCloudinaryImage({ id: cloudinaryId }, ctx);
        throw new Error('Unable to update.');
      }
    }
  }
);
