import { resolver } from 'blitz';
import db from 'db';

import { UpdateGalleryPictureDescriptionSchema } from '../../validations/gallery-picture/gallery-picture-validations';

export default resolver.pipe(
  resolver.authorize(),
  resolver.zod(UpdateGalleryPictureDescriptionSchema),
  async ({ id, description }) => {
    return db.homeImage.update({
      data: {
        description,
      },
      select: {
        id: true,
      },
      where: {
        id,
      },
    });
  }
);
