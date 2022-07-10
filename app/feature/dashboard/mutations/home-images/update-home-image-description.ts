import { resolver } from 'blitz';
import db from 'db';

import { UpdateHomeImageDescriptionSchema } from '../../validations/home-image/home-image-validations';

export default resolver.pipe(
  resolver.authorize(),
  resolver.zod(UpdateHomeImageDescriptionSchema),
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
