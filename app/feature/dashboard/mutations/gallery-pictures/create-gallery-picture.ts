import { resolver } from 'blitz';
import db from 'db';

import { CreateGalleryPictureSchema } from '../../validations/gallery-picture/gallery-picture-validations';

export default resolver.pipe(
  resolver.authorize(),
  resolver.zod(CreateGalleryPictureSchema),
  async ({ description, height, url, width, cloudinaryId }) => {
    return db.homeImage.create({
      data: {
        cloudinaryId,
        description,
        height,
        url,
        width,
      },
    });
  }
);
