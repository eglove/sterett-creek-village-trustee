import { resolver } from 'blitz';
import db from 'db';

import { CreateHomeImageSchema } from '../../validations/home-image/home-image-validations';

export default resolver.pipe(
  resolver.authorize(),
  resolver.zod(CreateHomeImageSchema),
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
