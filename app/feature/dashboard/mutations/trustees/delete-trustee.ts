import { Ctx, resolver } from 'blitz';
import db from 'db';

import deleteCloudinaryImage from '../../../../mutations/delete-cloudinary-image';
import { IdSchema } from '../../../../validations';

export default resolver.pipe(
  resolver.authorize(),
  resolver.zod(IdSchema),
  async ({ id }, ctx: Ctx) => {
    // Delete trustee
    const deleted = await db.trustee.delete({
      select: { id: true, image: { select: { cloudinaryId: true, id: true } } },
      where: {
        id,
      },
    });

    // Delete image from db
    await db.image.delete({
      select: { id: true },
      where: {
        id: deleted.image.id,
      },
    });

    // Delete cloudinary image
    await deleteCloudinaryImage(
      {
        id: deleted.image.cloudinaryId,
      },
      ctx
    );

    // Reorder trustees
    const trustees = await db.trustee.findMany({
      orderBy: {
        order: 'desc',
      },
      select: {
        id: true,
        order: true,
      },
    });

    let currentOrder = 0;
    const updatePromises: Array<Promise<unknown>> = [];
    for (const trustee of trustees) {
      if (currentOrder !== trustee.order) {
        updatePromises.push(
          db.trustee.update({
            data: {
              order: currentOrder,
            },
            select: { id: true },
            where: {
              id: trustee.id,
            },
          })
        );
      }

      currentOrder += 1;
    }

    await Promise.all(updatePromises);

    return deleted;
  }
);
