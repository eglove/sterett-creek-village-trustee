import { Ctx, resolver } from 'blitz';
import db from 'db';

import deleteS3File from '../../../../mutations/delete-s3-file';
import { UpdateHomeSchema } from '../../validations/home/home-validations';

export default resolver.pipe(
  resolver.authorize(),
  resolver.zod(UpdateHomeSchema),
  async (
    { missionStatement, url, height, width, description, accessKey },
    ctx: Ctx
  ) => {
    const homeContent = await db.homeContent.findFirst({
      select: {
        id: true,
        image: { select: { accessKey: true } },
        imageId: true,
      },
    });

    // Delete previous file if new one is given
    if (homeContent !== null && typeof accessKey !== 'undefined') {
      await deleteS3File({ id: homeContent.image.accessKey }, ctx);
    }

    try {
      if (
        homeContent === null &&
        typeof missionStatement !== 'undefined' &&
        typeof accessKey !== 'undefined' &&
        typeof description !== 'undefined' &&
        typeof height !== 'undefined' &&
        typeof url !== 'undefined' &&
        typeof width !== 'undefined'
      ) {
        return await db.homeContent.create({
          data: {
            content: missionStatement,
            image: {
              create: { accessKey, description, height, url, width },
            },
          },
          select: { id: true },
        });
      }

      return await db.homeContent.update({
        data: {
          content: missionStatement,
          image: {
            update: { accessKey, description, height, url, width },
          },
        },
        select: { id: true },
        where: { id: homeContent?.id },
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        await deleteS3File({ id: accessKey }, ctx);
        throw new Error('Unable to update.');
      }
    }
  }
);
